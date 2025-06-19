import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundry/ErrorBoundry.tsx';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback.tsx';
import { SessionProvider } from './Context/SessionContext.tsx';
import App from './App.tsx';
import '@/App.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorFallback />}>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SessionProvider>
  </ErrorBoundary>
);