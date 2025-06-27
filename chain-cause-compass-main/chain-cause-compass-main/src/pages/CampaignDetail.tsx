
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Heart, Share2, Flag, Calendar, MapPin, Users, DollarSign, CheckCircle, Clock, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const CampaignDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState("");
  const [isDonating, setIsDonating] = useState(false);

  // Mock campaign data (in real app, this would be fetched based on ID)
  const campaign = {
    id: 1,
    title: "Clean Water for Rural Communities",
    description: "Providing access to clean drinking water through blockchain-verified infrastructure projects in remote villages across developing regions.",
    fullDescription: "Our mission is to bring clean, safe drinking water to rural communities that have been underserved for decades. Through blockchain technology, we ensure complete transparency in how funds are used, from purchasing materials to construction completion. Every dollar donated can be tracked in real-time, giving donors confidence that their contribution is making a direct impact.\n\nThis project will install water purification systems, dig wells, and create sustainable water distribution networks in 5 rural villages. We partner with local communities to ensure long-term maintenance and sustainability.",
    goal: 50000,
    raised: 32000,
    donors: 245,
    daysLeft: 15,
    image: "/placeholder.svg",
    category: "Health",
    status: "Active",
    organizer: {
      name: "Water for All Foundation",
      verified: true,
      campaigns: 12,
      successRate: "94%"
    },
    location: "Kenya, East Africa",
    created: "2024-01-15",
    milestones: [
      {
        title: "Initial Planning & Survey",
        amount: 5000,
        status: "completed",
        description: "Community assessment and site survey completed"
      },
      {
        title: "Equipment Procurement",
        amount: 15000,
        status: "completed",
        description: "Water purification equipment purchased and shipped"
      },
      {
        title: "Installation Phase 1",
        amount: 20000,
        status: "in-progress",
        description: "Installing water systems in first 3 villages"
      },
      {
        title: "Installation Phase 2",
        amount: 10000,
        status: "pending",
        description: "Complete installation in remaining 2 villages"
      }
    ],
    recentDonations: [
      { donor: "0x1234...5678", amount: 500, time: "2 hours ago" },
      { donor: "0x9876...5432", amount: 250, time: "5 hours ago" },
      { donor: "0x4567...8901", amount: 1000, time: "1 day ago" },
      { donor: "0x2345...6789", amount: 150, time: "1 day ago" },
      { donor: "0x8901...2345", amount: 750, time: "2 days ago" }
    ]
  };

  const handleDonate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    setIsDonating(true);
    
    // Simulate donation process
    setTimeout(() => {
      setIsDonating(false);
      toast({
        title: "Donation Successful! 🎉",
        description: `Thank you for donating $${donationAmount} to this campaign.`,
      });
      setDonationAmount("");
    }, 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Campaign link has been copied to your clipboard.",
    });
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress": return <Clock className="h-5 w-5 text-blue-500" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getMilestoneColor = (status: string) => {
    switch (status) {
      case "completed": return "border-green-200 bg-green-50";
      case "in-progress": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/campaigns">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Campaigns
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                  <Heart className="h-24 w-24 text-blue-600" />
                  <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">
                    ✓ Verified
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{campaign.category}</Badge>
                      <Badge className="bg-green-100 text-green-800">{campaign.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">{campaign.title}</CardTitle>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Started {new Date(campaign.created).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Campaign Tabs */}
              <Tabs defaultValue="story" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="story">Story</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="donations">Donations</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="story" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Story</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        {campaign.fullDescription.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="milestones" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Milestones</CardTitle>
                      <p className="text-gray-600">Track the progress of this campaign through verified milestones</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {campaign.milestones.map((milestone, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${getMilestoneColor(milestone.status)}`}>
                            <div className="flex items-start gap-3">
                              {getMilestoneIcon(milestone.status)}
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold">{milestone.title}</h4>
                                  <span className="text-sm font-medium">${milestone.amount.toLocaleString()}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{milestone.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="donations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Donations</CardTitle>
                      <p className="text-gray-600">Latest contributions from our amazing community</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {campaign.recentDonations.map((donation, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <Heart className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{donation.donor}</p>
                                <p className="text-sm text-gray-600">{donation.time}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">${donation.amount}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="updates" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No updates available yet.</p>
                        <p className="text-sm">Check back later for campaign progress updates.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Donation Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Support This Campaign</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Raised</span>
                      <span className="text-gray-500">Goal</span>
                    </div>
                    <div className="text-2xl font-bold">
                      ${campaign.raised.toLocaleString()} 
                      <span className="text-lg text-gray-500 font-normal">
                        {" "}of ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{campaign.donors} donors</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>

                  {/* Donation Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Donation Amount (USD)</label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[25, 50, 100].map(amount => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setDonationAmount(amount.toString())}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleDonate}
                      disabled={isDonating}
                    >
                      {isDonating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="mr-2 h-4 w-4" />
                          Donate Now
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Secured by blockchain technology
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{campaign.organizer.name}</h4>
                          {campaign.organizer.verified && (
                            <Badge className="bg-green-100 text-green-800">✓</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Verified Organizer</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Campaigns</p>
                        <p className="font-semibold">{campaign.organizer.campaigns}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Success Rate</p>
                        <p className="font-semibold">{campaign.organizer.successRate}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
