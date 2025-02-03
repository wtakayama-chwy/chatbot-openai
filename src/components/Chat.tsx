'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useChat } from 'ai/react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ChatMessages } from './ChatMessages';
import { isClientLocalhost } from '@/lib/utils';

export const Chat = () => {
  const t = useTranslations('Chat');

  const {
    messages = [],
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading: isSending,
  } = useChat({
    api: '/api/chat',
  });
  const uiMessages = messages.map((message) => ({
    ...message,
    created_at: message.createdAt?.toISOString(),
  }));

  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = isSending || isLoading;

  const runMigration = async () => {
    try {
      const response = await fetch('/api/chat/storage');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetDb = async () => {
    try {
      await fetch('/api/chat/storage', {
        method: 'DELETE',
      });
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/chat/messages');
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Card className="mx-8 w-[600px]">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>{t('description')}</span>
          {isClientLocalhost() && (
            <>
              <Button
                className="w-fit"
                variant="secondary"
                onClick={async () => await runMigration()}
              >
                {t('button.migrate')}
              </Button>
              <Button
                className="w-fit"
                variant="destructive"
                onClick={async () => await resetDb()}
              >
                {t('button.reset_db')}
              </Button>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent data-testid="chat-content">
        <ChatMessages
          messages={uiMessages}
          hasError={Boolean(error)}
          isLoading={isLoading}
        />
      </CardContent>
      <CardFooter>
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder={t('input.placeholder')}
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={isButtonDisabled}>
            {isSending && <Loader2 className="animate-spin" />}
            {t('button.send')}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
