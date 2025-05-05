
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from '@/hooks/useTheme';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Moon, Sun, User, Settings, LogOut, Zap, Home } from 'lucide-react';

export default function MainNavbar() {
  const { address } = useAccount();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: "You earned 50 points", read: false },
    { id: 2, text: "New bounty available", read: false }
  ]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            dklabs.io
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Dashboard
            </span>
          </Link>
          <Link 
            to="/earn"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/earn') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Earn
            </span>
          </Link>
        </div>

        {/* Settings Menu & User Options */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 relative" title="Notifications">
                  <Bell className="h-4 w-4" />
                  {notifications.some(n => !n.read) && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className="py-2">
                      <div className="flex items-start gap-2">
                        {!notification.read && (
                          <div className="w-2 h-2 mt-1 rounded-full bg-blue-500 flex-shrink-0"></div>
                        )}
                        <span>{notification.text}</span>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="py-2 px-2 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu with Enhanced Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-gray-800 rounded-full" title="User Menu">
                  <Avatar className="w-10 h-10 border-2 border-transparent hover:border-blue-500 transition-colors">
                    <AvatarImage src={`https://avatars.dicebear.com/api/initials/${address?.substring(2, 4) || 'DK'}.svg`} />
                    <AvatarFallback className="bg-blue-900 text-blue-100">
                      {address ? address.substring(2, 4).toUpperCase() : "DK"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Connect Button (when not connected) */}
            <ConnectButton showBalance={{smallScreen: false, largeScreen: true}} />
          </div>
        </div>

        {/* Mobile Menu (simplified for now) */}
        <div className="md:hidden flex items-center">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  );
}
