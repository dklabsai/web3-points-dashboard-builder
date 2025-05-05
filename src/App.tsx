
import React from 'react';
import './App.css';
import { WagmiConfig, RainbowKitProvider, chains, darkTheme, wagmiClient } from '@/lib/wallet';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/hooks/useTheme';

// Pages
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import AppLayout from '@/components/layout/AppLayout';
import Profile from '@/pages/Profile';
import Earn from '@/pages/Earn';

// Create a client for React Query
const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiConfig config={wagmiClient}>
      <ThemeProvider defaultTheme="dark">
        <RainbowKitProvider chains={chains} theme={darkTheme({ borderRadius: 'medium' })}>
          <Router>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Navigate to="/" replace />} />
                  <Route path="earn" element={<Earn />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <Toaster />
            </QueryClientProvider>
          </Router>
        </RainbowKitProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
}
