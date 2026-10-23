import { convertToModelMessages, streamText, toUIMessageStream, createUIMessageStreamResponse } from 'ai';
import type { UIMessage } from 'ai';
import { setDefaultResultOrder } from 'node:dns';
import { model, systemPrompt } from '@/lib/ai-config';

export async function POST(request: Request) {
  setDefaultResultOrder('ipv4first');

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return Response.json({ error: 'GOOGLE_GENERATIVE_AI_API_KEY is not configured.' }, { status: 500 });
  }

  const { messages }: { messages: UIMessage[] } = await request.json();
  const result = streamText({
    model,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxRetries: 0,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: () => 'Gemini is temporarily unavailable. Please try again.',
    }),
  });
}
