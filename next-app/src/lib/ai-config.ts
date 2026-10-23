import { google } from '@ai-sdk/google';

// Use Gemini Flash Lite for fast responses with broad availability.
export const model = google('gemini-3.1-flash-lite');
// Keep the assistant focused on task management questions.
export const systemPrompt = 'You are a helpful task management assistant.';
