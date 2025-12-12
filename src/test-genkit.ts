import { ai } from '@/ai/genkit';

async function test() {
    console.log('AI Instance keys:', Object.keys(ai));
    try {
        const response = await ai.generate({
            model: 'googleai/gemini-pro',
            prompt: 'Hello',
        });
        console.log('Response keys:', Object.keys(response));
        console.log('Response text:', response.text);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
