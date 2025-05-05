
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import MainNavbar from './MainNavbar';

export default function AppLayout() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gray-950 text-white dark:bg-gray-950 dark:text-white">
      {isConnected && <MainNavbar />}
      
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      <footer className="container mx-auto px-4 py-6 mt-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>© 2025 dklabs.io - The Decentralized Computing Network</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
