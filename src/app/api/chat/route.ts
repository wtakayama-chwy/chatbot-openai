import { env } from '@/env';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { randomUUID } from 'crypto';

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
});

const model = openai('gpt-4-turbo');

export async function POST(req: Request) {
  const body = await req.json();

  const result = streamText({
    model,
    messages: body.messages,
    onFinish: async (event) => {
      const lastMessage = body.messages[body.messages.length - 1];
      const { messages } = event.response;

      // save user message
      await fetch(`${env.BASE_URL}/api/chat/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: randomUUID(),
          content: lastMessage?.content,
          user_id: '1',
          role: lastMessage?.role,
          created_at: new Date().toISOString(),
        }),
      });

      // save assistant response message
      for (const message of messages) {
        const response = await fetch(`${env.BASE_URL}/api/chat/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: message.id,
            content:
              typeof message.content[0] === 'object' &&
              'text' in message.content[0]
                ? message.content[0].text
                : message.content[0],
            user_id: '1',
            role: message.role,
            created_at: event.response.timestamp.toISOString(),
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to persist messages to the database');
        }
      }
    },
  });

  return result.toDataStreamResponse();
}
