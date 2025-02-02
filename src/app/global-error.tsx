'use client';

import { useLocale, useTranslations } from 'next-intl';

import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  const t = useTranslations('GlobalError');
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <h2 className="text-2xl font-bold text-red-600">{t('title')}</h2>
          <p>{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            {t('button.refresh')}
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
