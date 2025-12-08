'use server';

/**
 * @fileOverview Implements the AI ranking engine flow for job postings.
 *
 * - aiRankJobs - Ranks job postings based on a job seeker's profile.
 * - AIRankingEngineInput - The input type for the aiRankJobs function.
 * - AIRankingEngineOutput - The return type for the aiRankJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRankingEngineInputSchema = z.object({
  jobSeekerProfile: z
    .string()
    .describe('The job seeker profile, including skills, experience, and location.'),
  jobPostings: z.array(z.string()).describe('An array of job postings descriptions.'),
});
export type AIRankingEngineInput = z.infer<typeof AIRankingEngineInputSchema>;

const AIRankingEngineOutputSchema = z.array(
  z.object({
    jobPosting: z.string().describe('The job posting description.'),
    matchScore: z.number().describe('The AI-calculated match score for the job posting.'),
    topReasons: z.array(z.string()).describe('The top 3 reasons why the job matched.'),
  })
);
export type AIRankingEngineOutput = z.infer<typeof AIRankingEngineOutputSchema>;

export async function aiRankJobs(input: AIRankingEngineInput): Promise<AIRankingEngineOutput> {
  return aiRankingEngineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRankingEnginePrompt',
  input: {schema: AIRankingEngineInputSchema},
  output: {schema: AIRankingEngineOutputSchema},
  prompt: `You are an AI job matching expert.  Given a job seeker profile and a list of job postings, rank the job postings by how well they match the job seeker's skills, experience, and location.

For each job posting, provide a match score between 0 and 1 (0 being no match, 1 being a perfect match) and the top 3 reasons why the job matched.

Job Seeker Profile: {{{jobSeekerProfile}}}

Job Postings:
{{#each jobPostings}}- {{{this}}}
{{/each}}`,
});

const aiRankingEngineFlow = ai.defineFlow(
  {
    name: 'aiRankingEngineFlow',
    inputSchema: AIRankingEngineInputSchema,
    outputSchema: AIRankingEngineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
