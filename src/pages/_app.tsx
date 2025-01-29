import type { AppProps } from 'next/app';
import { TranslationProvider } from '@/contexts/TranslationContext';
import '../app/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider>
      <Component {...pageProps} />
    </TranslationProvider>
  );
}
