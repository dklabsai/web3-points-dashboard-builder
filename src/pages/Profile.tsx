
import React from 'react';
import { useAccount } from 'wagmi';
import { useUser } from '@/hooks/useUser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Edit, Wallet } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { user, loading } = useUser();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold mb-6">Please connect your wallet</h1>
        <p className="text-gray-400 mb-4">You need to connect your wallet to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-blue-900 text-blue-100 text-xl">
              {address ? address.substring(2, 4).toUpperCase() : "??"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
            </h1>
            <p className="text-gray-400 flex items-center">
              <Wallet className="mr-1 h-4 w-4" /> {address}
            </p>
          </div>
          
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="balances" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="balances">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900/70 backdrop-blur-lg border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">DKL Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">0 DKL</div>
                  <div className="text-gray-400 text-sm">$0.00</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/70 backdrop-blur-lg border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Points Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.points || 0} pts</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/70 backdrop-blur-lg border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ETH Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">0.00 ETH</div>
                  <div className="text-gray-400 text-sm">$0.00</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Other Tokens</h2>
            <div className="text-center py-6 text-gray-400">
              <p>No other tokens found in your wallet</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nfts">
          <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Your NFT Collection</h2>
            <div className="text-center py-12 text-gray-400">
              <User className="mx-auto h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg">No NFTs found in your wallet</p>
              <p className="text-sm mt-2">NFTs you own will appear here</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="staking">
          <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Staking Positions</h2>
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No active staking positions</p>
              <p className="text-sm mt-2">Staking will be available soon</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left pb-3 text-gray-400 font-medium">Date</th>
                    <th className="text-left pb-3 text-gray-400 font-medium">Type</th>
                    <th className="text-left pb-3 text-gray-400 font-medium">Amount</th>
                    <th className="text-left pb-3 text-gray-400 font-medium">Status</th>
                    <th className="text-left pb-3 text-gray-400 font-medium">Hash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const ProfileSkeleton = () => (
  <div>
    <div className="mb-8">
      <div className="flex items-center gap-6">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
    </div>
    
    <Skeleton className="h-10 w-64 mb-6" />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
    
    <Skeleton className="h-64 w-full mt-8" />
  </div>
);
