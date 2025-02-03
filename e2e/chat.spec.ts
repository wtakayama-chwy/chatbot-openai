import type { UiMessage } from '@/_types';
import { env } from '@/env';
import { test, expect, Locator, Page } from '@playwright/test';

const randomNumber = Math.random();
const randomMessage = `How much is ${randomNumber * 1}`;
const userName = 'William S. Takayama';
const aiUserName = 'AI assistant';

async function checkMessage(content: RegExp, chatContent: Locator) {
  await expect
    .soft(
      chatContent.getByText(content),
      'Should display initial messages when available inside chat'
    )
    .toBeVisible();
}

async function getForChatMessagesResponse(page: Page) {
  const res = await page.waitForResponse(
    (response) => {
      console.log(response.url());
      return (
        response.url().includes('api/chat/messages') &&
        response.status() === 200
      );
    },
    {
      timeout: 60 * 1000, // 60 seconds
    }
  );
  const data = await res.json();
  return data.messages;
}

test('Should test happy path chat flow', async ({ page }) => {
  await page.goto(env.BASE_URL);

  const skeleton = page.locator('.animate-pulse').first();
  const messageInput = page.getByRole('textbox', {
    name: 'How can I help you?',
  });
  const sendButton = page.getByRole('button', { name: 'Send' });
  const chatContent = page.getByTestId('chat-content');

  // Initial basic checks and initial message
  const [chatMessages] = await Promise.all([
    getForChatMessagesResponse(page),
    expect
      .soft(page, 'Should display correct page title')
      .toHaveTitle(/Chat AI/),
    expect
      .soft(skeleton, 'Should display skeleton while fetching initial data')
      .toBeVisible(),
    expect.soft(messageInput, 'Should display message input').toBeVisible(),
    expect.soft(sendButton, 'Should display send button').toBeVisible(),
  ]);
  if (chatMessages?.length > 0) {
    const promises = chatMessages.map((message: UiMessage) =>
      checkMessage(RegExp(`${userName}.*${message.content}`), chatContent)
    );
    await Promise.all(promises);
  }

  // Reset database
  await page
    .getByRole('button', { name: 'Reset database' })
    .click({ force: true });
  await expect
    .soft(
      chatContent.getByText(userName),
      'Should not display user message after reset database'
    )
    .not.toBeVisible();

  // Add new message and waiting for openAI response
  await messageInput.fill(randomMessage);
  await Promise.all([
    sendButton.click(),
    expect
      .soft(
        sendButton,
        'Should display send button disabled while sending data'
      )
      .toBeDisabled(),
  ]);
  await checkMessage(RegExp(`${aiUserName}.*${randomNumber}`), chatContent);
});
