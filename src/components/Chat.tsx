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
import { useLocale, useTranslations } from 'next-intl';

import { UiMessage } from '@/_types';
import { ChatMessages } from './ChatMessages';

export const Chat = () => {
  const t = useTranslations('Chat');
  const locale = useLocale();

  const [allMessages, setAllMessages] = useState<UiMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading: isSending,
  } = useChat({
    api: '/api/chat',
  });

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
      setAllMessages([]);
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
        setAllMessages(data.messages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    setAllMessages(
      messages.map(
        (message) =>
          ({
            ...message,
            created_at: message.createdAt?.toISOString(),
          }) as UiMessage
      )
    );
  }, [messages, locale]);

  return (
    <Card className="mx-8 w-[600px]">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>{t('description')}</span>
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
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChatMessages
          messages={allMessages}
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
          <Button type="submit" disabled={isSending}>
            {isSending && <Loader2 className="animate-spin" />}
            {t('button.send')}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
