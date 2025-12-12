'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRoadmapGeneratorInputSchema = z.object({
  goal: z.string().describe('The user\'s career goal (e.g., "Become a Data Scientist").'),
  currentRole: z.string().optional().describe('The user\'s current role or background.'),
  skills: z.array(z.string()).optional().describe('The user\'s current skills.'),
});

export type AIRoadmapGeneratorInput = z.infer<
  typeof AIRoadmapGeneratorInputSchema
>;

const TaskSchema = z.object({
  text: z.string().describe('Description of the task.'),
  completed: z.boolean().describe('Whether the task is completed (default false).'),
});

const PhaseSchema = z.object({
  title: z.string().describe('Title of the phase (e.g., "Phase 1: Foundation").'),
  duration: z.string().describe('Estimated duration (e.g., "3 months").'),
  cost: z.number().describe('Estimated cost in local currency.'),
  icon: z.string().optional().describe('Name of an icon to represent this phase (e.g., "GraduationCap", "BrainCircuit").'),
  tasks: z.array(TaskSchema).describe('List of tasks for this phase.'),
});

const AIRoadmapGeneratorOutputSchema = z.object({
  goal: z.string().describe('The confirmed career goal.'),
  phases: z.array(PhaseSchema).describe('The generated roadmap phases.'),
});

export type AIRoadmapGeneratorOutput = z.infer<
  typeof AIRoadmapGeneratorOutputSchema
>;

export async function generateRoadmap(
  input: AIRoadmapGeneratorInput
): Promise<AIRoadmapGeneratorOutput> {
  return aiRoadmapGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRoadmapGeneratorPrompt',
  input: {schema: AIRoadmapGeneratorInputSchema},
  output: {schema: AIRoadmapGeneratorOutputSchema},
  prompt: `You are an expert career counselor and AI roadmap generator. Create a detailed, step-by-step career roadmap for the following goal.

Goal: {{{goal}}}
{{#if currentRole}}Current Role: {{{currentRole}}}{{/if}}
{{#if skills}}Current Skills: {{{skills}}}{{/if}}

Generate a structured roadmap with 4 distinct phases.
For each phase, provide:
1. A clear title (e.g., "Phase 1: Fundamentals").
2. Estimated duration.
3. Estimated cost (approximate).
4. A list of actionable tasks (courses to take, projects to build, skills to learn).
5. Suggest a Lucide icon name that fits the phase (e.g., GraduationCap, BrainCircuit, Briefcase, Globe, Rocket).

Ensure the roadmap is realistic and actionable.
`,
});

const aiRoadmapGeneratorFlow = ai.defineFlow(
  {
    name: 'aiRoadmapGeneratorFlow',
    inputSchema: AIRoadmapGeneratorInputSchema,
    outputSchema: AIRoadmapGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
