
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Zap, ArrowLeft, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleWalletConnect = async (walletType: string) => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Wallet Connected Successfully!",
        description: `Your ${walletType} wallet has been connected to BlockCharity.`,
      });
    }, 2000);
  };

  const walletOptions = [
    {
      name: "MetaMask",
      description: "Connect with the most popular Ethereum wallet",
      icon: "🦊",
      popular: true
    },
    {
      name: "WalletConnect",
      description: "Connect with mobile wallets via QR code",
      icon: "📱",
      popular: false
    },
    {
      name: "Coinbase Wallet",
      description: "Connect with Coinbase's secure wallet",
      icon: "🔵",
      popular: false
    }
  ];

  if (isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Navigation />
        <div className="pt-20 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to BlockCharity! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your wallet is now connected. You can start exploring campaigns and making donations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/campaigns">Explore Campaigns</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Connect Your Wallet
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Secure, decentralized access to transparent charity crowdfunding
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Wallet Options */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Wallet</h2>
              <div className="space-y-4">
                {walletOptions.map((wallet, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => handleWalletConnect(wallet.name)}
                  >
                    <CardContent className="flex items-center p-6">
                      <div className="text-3xl mr-4">{wallet.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{wallet.name}</h3>
                          {wallet.popular && (
                            <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{wallet.description}</p>
                      </div>
                      <Wallet className="h-5 w-5 text-gray-400" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {isConnecting && (
                <Card className="mt-4 border-blue-200 bg-blue-50">
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4"></div>
                    <span className="text-blue-600 font-medium">Connecting to wallet...</span>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Connect?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
                    <p className="text-gray-600">
                      All donations are processed securely through blockchain technology, ensuring your funds reach their intended destination.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Zap className="h-8 w-8 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Instant Donations</h3>
                    <p className="text-gray-600">
                      Make donations instantly with cryptocurrency, with immediate confirmation and tracking.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Full Transparency</h3>
                    <p className="text-gray-600">
                      Track your donations in real-time and see exactly how funds are being used by verified organizations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your Security is Our Priority</h3>
              <p className="text-gray-600">
                We never store your private keys or have access to your wallet. 
                Your connection is secure and you maintain full control of your funds.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
