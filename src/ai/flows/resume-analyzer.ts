'use server';
/**
 * @fileOverview An AI agent for analyzing a resume against a job description.
 *
 * - analyzeResumeAgainstJob - A function that provides feedback on a resume.
 * - ResumeAnalysisInput - The input type for the function.
 * - ResumeAnalysis - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeAnalysisInputSchema = z.object({
  resume: z.string().describe("The full text of the user's resume."),
  jobDescription: z.string().describe("The full text of the target job description."),
});
export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

const ResumeAnalysisSchema = z.object({
  matchScore: z.number().describe('A score from 0 to 100 indicating how well the resume matches the job description.'),
  summary: z.string().describe('A one-sentence summary of the match.'),
  strengths: z.array(z.string()).describe('A list of key strengths of the resume for this specific job.'),
  improvements: z.array(z.string()).describe('A list of actionable suggestions for improving the resume for this job.'),
});
export type ResumeAnalysis = z.infer<typeof ResumeAnalysisSchema>;

export async function analyzeResumeAgainstJob(
  input: ResumeAnalysisInput
): Promise<ResumeAnalysis> {
  return resumeAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeAnalyzerPrompt',
  input: {schema: ResumeAnalysisInputSchema},
  output: {schema: ResumeAnalysisSchema},
  prompt: `You are an expert career coach and resume writer. Analyze the provided RESUME against the JOB DESCRIPTION.

Provide a detailed analysis including:
1.  A match score from 0-100.
2.  A concise, one-sentence summary of the candidate's suitability.
3.  A bulleted list of the top 3-4 strengths (e.g., "Excellent match for required skill 'TypeScript'").
4.  A bulleted list of the top 3-4 actionable improvements (e.g., "Quantify achievements in the 'Project X' description with metrics like 'improved performance by 15%'").

RESUME:
{{{resume}}}

JOB DESCRIPTION:
{{{jobDescription}}}
`,
});

const resumeAnalyzerFlow = ai.defineFlow(
  {
    name: 'resumeAnalyzerFlow',
    inputSchema: ResumeAnalysisInputSchema,
    outputSchema: ResumeAnalysisSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
