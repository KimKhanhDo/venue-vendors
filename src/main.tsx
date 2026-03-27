import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/poppins'; // 400
import '@fontsource/poppins/500.css'; // font-medium
import '@fontsource/poppins/600.css'; // font-semibold
import '@fontsource/poppins/700.css'; // font-bold
import '@fontsource/poppins/800.css'; // font-extrabold

import './index.css';
import App from './App.tsx';
import { seedLocalStorage } from './utils/seedLocalStorage.ts';
// import { seedDummyUsers } from '@/utils/seedDummyUsers.ts';

seedLocalStorage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
