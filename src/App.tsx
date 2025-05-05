
import React from 'react';
import './App.css';
import { WagmiConfig, RainbowKitProvider, chains, darkTheme, wagmiClient } from '@/lib/wallet';
import { useUser } from './hooks/useUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

// Create a client for React Query
const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      {/* Use darkTheme() with overrides, not a raw object */}
      <RainbowKitProvider chains={chains} theme={darkTheme({ borderRadius: 'medium' })}>
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
