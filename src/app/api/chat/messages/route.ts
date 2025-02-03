import { z } from 'zod';
import { NextResponse } from 'next/server';
import { apiGet, apiPost } from '../../database';
import { isLocalhost } from '@/lib/utils';

export async function GET(req: Request) {
  try {
    if (isLocalhost(req)) {
      const messages = await apiGet(`SELECT * FROM messages`);
      return NextResponse.json({ messages });
    }

    return NextResponse.json({ messages: [] });
  } catch {
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const createTransactionBodySchema = z.object({
      id: z.string(), // just to simplify, ideally we would be using uuid,
      content: z.string(),
      user_id: z.string(), // just to simplify, ideally we would be using uuid,
      role: z.enum(['user', 'assistant']),
      created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format, should be ISO string',
      }),
    });

    const { id, content, user_id, role, created_at } =
      createTransactionBodySchema.parse(body);

    if (isLocalhost(req)) {
      await apiPost(
        `INSERT INTO messages (id, content, user_id, role, created_at) VALUES (?, ?, ?, ?, ?)`,
        [id, content, user_id, role, created_at]
      );
      return NextResponse.json({
        message: 'Message created successfully',
      });
    }

    return NextResponse.json({
      message: 'Database works only on localhost for now',
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      error: err instanceof Error ? err.message : 'Internal Server Error',
    });
  }
}
