import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonMessage } from './SkeletonMessage';
import { ChatMessage } from './ChatMessage';
import { UiMessage } from '@/_types';
import { useTranslations } from 'next-intl';

interface ChatMessagesProps {
  hasError: boolean;
  messages: UiMessage[];
  isLoading: boolean;
}

export const ChatMessages = ({
  hasError,
  messages,
  isLoading,
}: ChatMessagesProps) => {
  const t = useTranslations('Chat');

  return hasError ? (
    <h2 className="text-red-600">{t('error_message')}</h2>
  ) : (
    <ScrollArea className="h-[600px] w-full pr-4">
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
