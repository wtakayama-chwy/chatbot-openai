import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonMessage } from './SkeletonMessage';
import { ChatMessage } from './ChatMessage';
import { UiMessage } from '@/_types';
import { useTranslations } from 'next-intl';

interface ChatMessagesProps {
  hasError: boolean;
  messages: UiMessage[];
  isLoading: boolean;
  emptyPlaceholder?: string;
}

export const ChatMessages = ({
  hasError,
  messages,
  isLoading,
  emptyPlaceholder,
}: ChatMessagesProps) => {
  const t = useTranslations('Chat');

  if (messages.length === 0 && !isLoading && emptyPlaceholder) {
    return <h2 className="text-slate-600">{emptyPlaceholder}</h2>;
  }

  return hasError ? (
    <h2 className="text-red-600">{t('error_message')}</h2>
  ) : (
    <ScrollArea className="h-[420px] w-full pr-4 md:h-[600px]">
      {isLoading ? (
        <SkeletonMessage />
      ) : (
        <>
          {messages.length > 0 &&
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
        </>
      )}
    </ScrollArea>
  );
};
