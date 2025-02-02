'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UiMessage } from '@/_types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocale, useTranslations } from 'next-intl';

interface ChatMessageProps {
  message: UiMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const t = useTranslations('Chat');
  const locale = useLocale();

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div key={message.id} className="mb-4 flex gap-3 text-sm">
      {isUser && (
        <Avatar>
          {/* For simplicity we're using a single hardcoded user*/}
          <AvatarFallback>WT</AvatarFallback>
          <AvatarImage src="https://github.com/wtakayama-chwy.png" />
        </Avatar>
      )}
      {isAssistant && (
        <Avatar>
          <AvatarFallback>{t('ai')}</AvatarFallback>
          <AvatarImage src="https://github.com/rocketseat.png" />
        </Avatar>
      )}
      <div className="w-full leading-relaxed">
        <span className="block font-bold">
          {isUser ? 'William S. Takayama' : t('assistant')}:
        </span>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
        {message.created_at && (
          <time className="text-xs" dateTime={message.created_at}>
            {new Date(message.created_at).toLocaleString(locale, {
              year: 'numeric',
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        )}
      </div>
    </div>
  );
};
