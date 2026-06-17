import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { I18nProvider } from './context/I18nProvider.jsx';
import { initGa4 } from './utils/initGa4.js';
import './styles/tailwind.css';
import './styles/main.css';
import './styles/conversion.css';
import './styles/mobile.css';
import './styles/dark.css';

void import('./styles/fonts.css');

initGa4();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
);
