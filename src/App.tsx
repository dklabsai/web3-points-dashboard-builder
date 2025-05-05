
import React from 'react';
import './App.css';
import { WagmiConfig, RainbowKitProvider, chains, darkTheme, wagmiClient } from '@/lib/wallet';
import { useUser } from './hooks/useUser';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

// Create a client for React Query
const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiConfig config={wagmiClient}>
      {/* Use darkTheme() with overrides, not a raw object */}
      <RainbowKitProvider chains={chains} theme={darkTheme({ borderRadius: 'medium' })}>
        <Router>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </QueryClientProvider>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
