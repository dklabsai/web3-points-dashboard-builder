
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { wagmiConfig, chains, RainbowKitProvider, darkTheme } from '@/lib/wallet';
import { Toaster } from '@/components/ui/sonner';

import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          chains={chains} 
          theme={darkTheme({
            accentColor: '#00C8FF', // neonBlue
            accentColorForeground: 'white',
            borderRadius: 'medium',
            overlayBlur: 'small',
          })}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
