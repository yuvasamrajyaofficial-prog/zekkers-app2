'use server';

import {ai} from '@/ai/genkit';

export async function generateAnswer(prompt: string) {
  const {text} = await ai.generate({
    prompt: `You are a helpful study assistant. Answer the following prompt based on the provided context if any. Prompt: ${prompt}`,
  });
  return text;
}
