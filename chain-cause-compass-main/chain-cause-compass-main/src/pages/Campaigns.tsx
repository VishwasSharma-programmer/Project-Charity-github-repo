
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Heart, Clock, Users, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const campaigns = [
    {
      id: 1,
      title: "Clean Water for Rural Communities",
      description: "Providing access to clean drinking water through blockchain-verified infrastructure projects in remote villages.",
      goal: 50000,
      raised: 32000,
      donors: 245,
      daysLeft: 15,
      image: "/placeholder.svg",
      category: "Health",
      status: "Active",
      organizer: "Water for All Foundation",
      verified: true
    },
    {
      id: 2,
      title: "Education for Underprivileged Children",
      description: "Building schools and providing educational resources with full transparency and community involvement.",
      goal: 75000,
      raised: 48000,
      donors: 189,
      daysLeft: 22,
      image: "/placeholder.svg",
      category: "Education",
      status: "Active",
      organizer: "Global Education Initiative",
      verified: true
    },
    {
      id: 3,
      title: "Disaster Relief Fund",
      description: "Emergency aid for natural disaster victims with real-time fund tracking and immediate distribution.",
      goal: 100000,
      raised: 67000,
      donors: 312,
      daysLeft: 8,
      image: "/placeholder.svg",
      category: "Emergency",
      status: "Active",
      organizer: "Emergency Response Network",
      verified: true
    },
    {
      id: 4,
      title: "Renewable Energy Project",
      description: "Installing solar panels in off-grid communities to provide sustainable energy solutions.",
      goal: 120000,
      raised: 85000,
      donors: 156,
      daysLeft: 30,
      image: "/placeholder.svg",
      category: "Environment",
      status: "Active",
      organizer: "Green Future Collective",
      verified: true
    },
    {
      id: 5,
      title: "Medical Equipment for Hospitals",
      description: "Purchasing life-saving medical equipment for underserved hospitals in developing regions.",
      goal: 60000,
      raised: 60000,
      donors: 423,
      daysLeft: 0,
      image: "/placeholder.svg",
      category: "Health",
      status: "Completed",
      organizer: "Healthcare Heroes",
      verified: true
    },
    {
      id: 6,
      title: "Animal Shelter Expansion",
      description: "Expanding local animal shelter facilities to rescue and care for more abandoned pets.",
      goal: 35000,
      raised: 18000,
      donors: 98,
      daysLeft: 18,
      image: "/placeholder.svg",
      category: "Animals",
      status: "Active",
      organizer: "Paws & Hearts Shelter",
      verified: true
    }
  ];

  const categories = ["all", "Health", "Education", "Emergency", "Environment", "Animals"];
  const statuses = ["all", "Active", "Completed", "Urgent"];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || campaign.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || campaign.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Urgent": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyBadge = (daysLeft: number) => {
    if (daysLeft <= 7 && daysLeft > 0) {
      return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Explore Campaigns
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover verified charitable campaigns and make a direct impact with blockchain transparency
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search campaigns..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === "all" ? "All Status" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''} Found
              </h2>
              <p className="text-gray-600">
                Support verified charitable causes with transparent fund tracking
              </p>
            </div>
            <Button asChild>
              <Link to="/create-campaign">Start Your Campaign</Link>
            </Button>
          </div>

          {/* Campaigns Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                  <Heart className="h-16 w-16 text-blue-600" />
                  {campaign.verified && (
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{campaign.category}</Badge>
                    <div className="flex gap-1">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      {getUrgencyBadge(campaign.daysLeft)}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{campaign.title}</CardTitle>
                  <p className="text-sm text-gray-600">by {campaign.organizer}</p>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{campaign.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Raised: ${campaign.raised.toLocaleString()}</span>
                      <span className="text-gray-500">Goal: ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{campaign.donors} donors</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Ended'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button asChild className="flex-1">
                      <Link to={`/campaign/${campaign.id}`}>View Details</Link>
                    </Button>
                    {campaign.status === 'Active' && (
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or explore different categories
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
