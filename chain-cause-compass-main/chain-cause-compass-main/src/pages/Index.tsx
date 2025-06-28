
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Heart, Shield, Users, DollarSign, TrendingUp, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const featuredCampaigns = [
    {
      id: 1,
      title: "Clean Water for Rural Communities",
      description: "Providing access to clean drinking water through blockchain-verified infrastructure projects.",
      goal: 50000,
      raised: 32000,
      donors: 245,
      image: "/placeholder.svg",
      category: "Health"
    },
    {
      id: 2,
      title: "Education for Underprivileged Children",
      description: "Building schools and providing educational resources with full transparency.",
      goal: 75000,
      raised: 48000,
      donors: 189,
      image: "/placeholder.svg",
      category: "Education"
    },
    {
      id: 3,
      title: "Disaster Relief Fund",
      description: "Emergency aid for natural disaster victims with real-time fund tracking.",
      goal: 100000,
      raised: 67000,
      donors: 312,
      image: "/placeholder.svg",
      category: "Emergency"
    }
  ];

  const stats = [
    { label: "Total Raised", value: "$2.4M", icon: DollarSign },
    { label: "Active Campaigns", value: "156", icon: TrendingUp },
    { label: "Donors", value: "12.5K", icon: Users },
    { label: "Success Rate", value: "94%", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🚀 Powered by Blockchain Technology
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              BlockCharity
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Revolutionizing charitable giving with blockchain transparency. 
              Every donation is tracked, verified, and immutable.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/campaigns">
                Explore Campaigns <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/create-campaign">Start a Campaign</Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Built on blockchain for maximum transparency and trust
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>100% Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every transaction is recorded on the blockchain, ensuring complete transparency and accountability.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <CardTitle>Direct Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your donations go directly to verified causes with real-time tracking of fund utilization.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join a community of donors and organizers working together to make a positive impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Campaigns
              </h2>
              <p className="text-xl text-gray-600">
                Make a difference today with these verified campaigns
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/campaigns">View All Campaigns</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-blue-600" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{campaign.category}</Badge>
                    <span className="text-sm text-gray-500">{campaign.donors} donors</span>
                  </div>
                  <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Raised: ${campaign.raised.toLocaleString()}</span>
                      <span>Goal: ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  </div>
                  <Button asChild className="w-full mt-4">
                    <Link to={`/campaign/${campaign.id}`}>View Campaign</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors and organizers creating positive change through transparent giving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-blue-600">
              <Link to="/campaigns">Start Donating</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-blue-600">
              <Link to="/create-campaign">Create Campaign</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">BlockCharity</h3>
          <p className="text-gray-400 mb-6">
            Transparent. Secure. Impactful.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link to="/campaigns" className="text-gray-400 hover:text-white transition-colors">Campaigns</Link>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
