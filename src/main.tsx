import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider } from '@/components/ui/provider.tsx';
import { store } from './store/store.ts';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <App />
      </Provider>
    </ReduxProvider>
  </StrictMode>
);
