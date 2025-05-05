
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleDollarSign, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ClaimTokensCardProps {
  unclaimedTokens: number;
  onClaim: () => Promise<void>;
}

const ClaimTokensCard = ({ unclaimedTokens, onClaim }: ClaimTokensCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleClaim = async () => {
    if (unclaimedTokens <= 0) return;
    
    setIsLoading(true);
    try {
      await onClaim();
      toast({
        title: "Tokens claimed!",
        description: `You've claimed ${unclaimedTokens.toFixed(2)} F4!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to claim tokens:", error);
      toast({
        title: "Claim failed",
        description: "There was an error claiming your tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800 shadow-xl mt-6 md:mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Claim Tokens</h2>
      
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <CircleDollarSign className="w-8 h-8 mb-3 text-blue-400" />
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Unclaimed Tokens</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-3xl font-bold">{unclaimedTokens.toFixed(2)}</span>
                <span className="ml-1 text-sm text-gray-400">F4</span>
              </div>
            </div>
            
            <Button 
              onClick={handleClaim} 
              disabled={unclaimedTokens <= 0 || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Claiming...
                </>
              ) : unclaimedTokens <= 0 ? (
                "No tokens to claim"
              ) : (
                "Claim"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClaimTokensCard;
