
import React from 'react';
import './App.css';
import { WagmiConfig, RainbowKitProvider, chains } from '@/lib/wallet';
import { wagmiClient } from '@/lib/wallet';
import { useUser } from './hooks/useUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        chains={chains} 
        theme={darkTheme({
          accentColor: '#00C8FF', // neonBlue
          accentColorForeground: 'white',
          borderRadius: 'medium',
          overlayBlur: 'small',
        })}
      >
        <Router>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </QueryClientProvider>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
