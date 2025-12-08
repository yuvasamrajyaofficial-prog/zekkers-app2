
'use server';
/**
 * @fileOverview An AI agent for conducting mock interviews.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

// --- Type Definitions ---

const InterviewFeedbackSchema = z.object({
  positive: z.string().describe("Positive feedback on the user's answer. Mention what they did well."),
  improvement: z.string().describe("Constructive feedback for improvement. Be specific and actionable."),
});

const InterviewQuestionSchema = z.object({
  question: z.string().describe("The interview question to ask the user."),
  audio: z.string().optional().describe("The base64 encoded WAV audio data for the question text."),
});

export const InterviewStateSchema = z.object({
  jobRole: z.string(),
  history: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
      feedback: InterviewFeedbackSchema,
    })
  ),
  currentQuestion: InterviewQuestionSchema,
});
export type InterviewState = z.infer<typeof InterviewStateSchema>;

export const StartInterviewInputSchema = z.object({
  jobRole: z.string(),
});
export type StartInterviewInput = z.infer<typeof StartInterviewInputSchema>;

export const SubmitAnswerInputSchema = z.object({
  interviewState: InterviewStateSchema,
  userAnswer: z.string(),
});
export type SubmitAnswerInput = z.infer<typeof SubmitAnswerInputSchema>;

// --- Helper Functions ---

async function textToSpeech(text: string): Promise<string> {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: { responseModalities: ['AUDIO'] },
        prompt: text,
    });
    if (!media) throw new Error('TTS generation failed.');

    const pcmData = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    const wavData = await toWav(pcmData);
    return `data:audio/wav;base64,${wavData}`;
}

async function toWav(pcmData: Buffer, channels = 1, rate = 24000, sampleWidth = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({ channels, sampleRate: rate, bitDepth: sampleWidth * 8 });
    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d: any) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
    writer.write(pcmData);
    writer.end();
  });
}

// --- Main Flows ---

const generateQuestionPrompt = ai.definePrompt({
    name: 'generateInterviewQuestion',
    input: { schema: z.object({ jobRole: z.string(), history: z.array(z.string()) }) },
    output: { schema: InterviewQuestionSchema.pick({ question: true }) },
    prompt: `You are an expert interviewer hiring for the role of {{{jobRole}}}. 
    Based on the interview history so far, ask the next relevant question. 
    Do not repeat questions.
    Previous questions:
    {{#each history}}- {{{this}}}{{/each}}
    `
});

const provideFeedbackPrompt = ai.definePrompt({
    name: 'provideInterviewFeedback',
    input: { schema: z.object({ question: z.string(), answer: z.string() }) },
    output: { schema: InterviewFeedbackSchema },
    prompt: `As an interview coach, evaluate the user's answer to the following question.
    Question: {{{question}}}
    Answer: {{{answer}}}
    Provide specific positive feedback and one key area for improvement.`
});

export async function startInterview(input: StartInterviewInput): Promise<InterviewState> {
  const { output } = await generateQuestionPrompt({ jobRole: input.jobRole, history: [] });
  if (!output) throw new Error('Failed to generate the first question.');

  const audio = await textToSpeech(output.question);

  return {
    jobRole: input.jobRole,
    history: [],
    currentQuestion: {
      question: output.question,
      audio: audio,
    },
  };
}

export async function submitAnswer(input: SubmitAnswerInput): Promise<InterviewState> {
  const { interviewState, userAnswer } = input;
  
  // 1. Get feedback on the last answer
  const feedbackResult = await provideFeedbackPrompt({
    question: interviewState.currentQuestion.question,
    answer: userAnswer,
  });
  if (!feedbackResult.output) throw new Error('Failed to get feedback.');
  
  const newHistoryItem = {
      question: interviewState.currentQuestion.question,
      answer: userAnswer,
      feedback: feedbackResult.output
  };

  // 2. Generate the next question
  const updatedHistory = [...interviewState.history, newHistoryItem];
  const questionHistory = updatedHistory.map(h => h.question);
  
  const nextQuestionResult = await generateQuestionPrompt({
    jobRole: interviewState.jobRole,
    history: questionHistory,
  });
  if (!nextQuestionResult.output) throw new Error('Failed to generate the next question.');

  // 3. Generate audio for the next question
  const audio = await textToSpeech(nextQuestionResult.output.question);

  return {
    ...interviewState,
    history: updatedHistory,
    currentQuestion: {
        question: nextQuestionResult.output.question,
        audio: audio,
    }
  };
}
