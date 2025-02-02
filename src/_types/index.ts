import { Message } from 'ai';

export type Locale = 'en-US' | 'pt-BR';

export type UiMessage = Message & {
  created_at?: string;
};
