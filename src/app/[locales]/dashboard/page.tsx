import { UiMessage } from '@/_types';
import { ChatMessages } from '@/components/ChatMessages';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { env } from '@/env';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const ChatHistoryPage = async () => {
  const t = await getTranslations('ChatHistoryPage');

  let error: Error | undefined;
  let chatData: { messages: UiMessage[] } = { messages: [] };

  async function fetchData() {
    try {
      const response = await fetch(`${env.BASE_URL}/api/chat/messages`, {
        cache: 'no-store',
      });
      chatData = await response.json();

      return chatData;
    } catch (err) {
      console.error(err);
      error = err as Error;
    }
  }
  await fetchData();

  const messages =
    chatData.messages?.length > 0
      ? chatData.messages.map((message: UiMessage) => message)
      : [];

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="mx-8 w-[600px] p-8">
        <CardTitle className="mb-8">{t('title')}</CardTitle>
        <CardContent>
          <ChatMessages
            messages={messages}
            hasError={Boolean(error)}
            isLoading={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatHistoryPage;
