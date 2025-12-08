'use server';
/**
 * @fileOverview An AI agent for generating job posts.
 *
 * - generateJobPost - A function that generates a job post.
 * - AIJobPostGeneratorInput - The input type for the generateJobPost function.
 * - AIJobPostGeneratorOutput - The return type for the generateJobPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIJobPostGeneratorInputSchema = z.object({
  title: z.string().describe('The job title.'),
  keywords: z.string().describe('Comma-separated keywords to include in the job description (e.g., company name, location, key technologies).'),
});
export type AIJobPostGeneratorInput = z.infer<
  typeof AIJobPostGeneratorInputSchema
>;

const AIJobPostGeneratorOutputSchema = z.object({
  description: z.string().describe('The generated job description.'),
  skills: z.array(z.string()).describe('An array of required skills.'),
  qualifications: z.array(z.string()).describe('An array of required qualifications.'),
});
export type AIJobPostGeneratorOutput = z.infer<
  typeof AIJobPostGeneratorOutputSchema
>;

export async function generateJobPost(
  input: AIJobPostGeneratorInput
): Promise<AIJobPostGeneratorOutput> {
  return aiJobPostGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiJobPostGeneratorPrompt',
  input: {schema: AIJobPostGeneratorInputSchema},
  output: {schema: AIJobPostGeneratorOutputSchema},
  prompt: `You are an expert recruitment copywriter. Generate a complete and professional job post for the following role.

Job Title: {{{title}}}
Keywords to include: {{{keywords}}}

Based on the title and keywords, generate the following:
1.  A detailed and engaging job description that outlines the role, responsibilities, and what makes the opportunity attractive.
2.  A list of essential skills required for the job.
3.  A list of necessary qualifications (like degrees or certifications).
`,
});

const aiJobPostGeneratorFlow = ai.defineFlow(
  {
    name: 'aiJobPostGeneratorFlow',
    inputSchema: AIJobPostGeneratorInputSchema,
    outputSchema: AIJobPostGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
