import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Configure Genkit with the Google AI plugin using the modern syntax.
// The `configureGenkit` function is deprecated and was causing runtime errors.
export const ai = genkit({
  plugins: [googleAI({
    apiVersion: "v1beta"
  })],
  model: 'googleai/gemini-pro',
});
