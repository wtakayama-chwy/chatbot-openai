import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().default('http://localhost:3333'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format());

  throw new Error('Invalid environment variables!');
}

export const env = _env.data;
