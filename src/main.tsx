import { createRoot } from 'react-dom/client';
import {ErrorBoundary} from '@/components/ErrorBoundry/ErrorBoundry.tsx';
import App from './App.tsx';
import '@/App.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<h2>Oops something went Wrong !</h2>}>
      <App />
    </ErrorBoundary>
);