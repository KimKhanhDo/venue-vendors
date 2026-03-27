import { Toaster } from 'sonner';

import AppRouter from '@/router/AppRouter';
import './index.css';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster richColors />
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
