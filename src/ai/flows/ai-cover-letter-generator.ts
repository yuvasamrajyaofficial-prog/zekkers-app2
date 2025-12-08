'use server';
/**
 * @fileOverview An AI agent for generating cover letters.
 *
 * - generateCoverLetter - A function that generates a cover letter.
 * - AICoverLetterGeneratorInput - The input type for the generateCoverLetter function.
 * - AICoverLetterGeneratorOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICoverLetterGeneratorInputSchema = z.object({
  jobDescription: z.string().describe('The job description for the job being applied to.'),
  resume: z.string().describe('The resume of the applicant.'),
  tone: z.string().optional().describe('The tone of the cover letter.'),
});
export type AICoverLetterGeneratorInput = z.infer<
  typeof AICoverLetterGeneratorInputSchema
>;

const AICoverLetterGeneratorOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter.'),
});
export type AICoverLetterGeneratorOutput = z.infer<
  typeof AICoverLetterGeneratorOutputSchema
>;

export async function generateCoverLetter(
  input: AICoverLetterGeneratorInput
): Promise<AICoverLetterGeneratorOutput> {
  return aiCoverLetterGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCoverLetterGeneratorPrompt',
  input: {schema: AICoverLetterGeneratorInputSchema},
  output: {schema: AICoverLetterGeneratorOutputSchema},
  prompt: `You are an AI assistant specializing in generating cover letters for job seekers.

  Given the job description and the applicant's resume, write a cover letter that is tailored to the job description.

  Job Description: {{{jobDescription}}}

  Resume: {{{resume}}}

  Tone: {{tone}}
  `,
});

const aiCoverLetterGeneratorFlow = ai.defineFlow(
  {
    name: 'aiCoverLetterGeneratorFlow',
    inputSchema: AICoverLetterGeneratorInputSchema,
    outputSchema: AICoverLetterGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
