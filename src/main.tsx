import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '@/components/ErrorBoundry/ErrorBoundry.tsx';
import {ErrorFallback} from '@/components/ErrorFallback/ErrorFallback.tsx';
import App from './App.tsx';
import '@/App.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorFallback />}>
    <App />
  </ErrorBoundary>
);