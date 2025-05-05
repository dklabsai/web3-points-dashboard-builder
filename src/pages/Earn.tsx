
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Earn() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Earn & Bounties</h1>
        <p className="text-gray-400">Complete tasks and earn rewards for your contributions</p>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="bounties">Bounties</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-gray-900/70 backdrop-blur-lg border-gray-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>AI Model Training {i}</CardTitle>
                    <div className="bg-blue-900/30 text-blue-400 text-xs font-medium px-2 py-1 rounded">
                      {i % 2 === 0 ? 'Open' : 'In Progress'}
                    </div>
                  </div>
                  <CardDescription>Train an AI model with your GPU processing power</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-400">Reward</span>
                    <span className="font-medium">{10 + i * 5} points</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-400">Estimated time</span>
                    <span>{i} hour{i > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Difficulty</span>
                    <span>{i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard'}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Task</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="bounties">
          <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Available Bounties</h2>
            <p className="text-gray-400 mb-6">
              Bounties are more complex tasks that require specialized skills and offer higher rewards.
            </p>
            
            {[1, 2].map((i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">Performance Optimization Bounty #{i}</h3>
                  <div className="bg-green-900/30 text-green-400 text-xs font-medium px-2 py-1 rounded">
                    100 + i * 50 POINTS
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Optimize rendering performance for our GPU compute algorithm, improving throughput by at least 15%.
                </p>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>Deadline: 2 weeks</span>
                  <span>3 applicants so far</span>
                </div>
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="referrals">
          <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Referral Program</h2>
            <p className="text-gray-400 mb-6">
              Invite friends to join dklabs.io and earn rewards when they contribute computing power.
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Your Referral Link</h3>
              <div className="flex">
                <input 
                  type="text" 
                  value="https://dklabs.io/?ref=0x1234...5678" 
                  readOnly
                  className="flex-1 bg-gray-800 border-gray-700 rounded-l-md p-2 text-sm"
                />
                <Button className="rounded-l-none">Copy</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Your Referrals</h3>
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <p className="text-gray-400">You haven't referred anyone yet</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
