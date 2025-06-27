
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Heart, DollarSign, Users, TrendingUp, Eye, Edit, Trash2, Calendar, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    verified: true,
    totalDonated: 2450,
    campaignsCreated: 3,
    campaignsSupported: 12
  };

  const myCampaigns = [
    {
      id: 1,
      title: "Local School Library Fund",
      status: "Active",
      goal: 10000,
      raised: 6500,
      donors: 45,
      daysLeft: 12,
      views: 234
    },
    {
      id: 2,
      title: "Community Garden Project",
      status: "Completed",
      goal: 5000,
      raised: 5000,
      donors: 32,
      daysLeft: 0,
      views: 189
    },
    {
      id: 3,
      title: "Animal Shelter Support",
      status: "Under Review",
      goal: 8000,
      raised: 0,
      donors: 0,
      daysLeft: 30,
      views: 12
    }
  ];

  const myDonations = [
    {
      id: 1,
      campaign: "Clean Water for Rural Communities",
      amount: 500,
      date: "2024-01-15",
      status: "Completed",
      organizer: "Water for All Foundation"
    },
    {
      id: 2,
      campaign: "Education for Underprivileged Children",
      amount: 250,
      date: "2024-01-10",
      status: "Completed",
      organizer: "Global Education Initiative"
    },
    {
      id: 3,
      campaign: "Disaster Relief Fund",
      amount: 1000,
      date: "2024-01-08",
      status: "In Progress",
      organizer: "Emergency Response Network"
    },
    {
      id: 4,
      campaign: "Medical Equipment for Hospitals",
      amount: 700,
      date: "2024-01-05",
      status: "Completed",
      organizer: "Healthcare Heroes"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Under Review": return "bg-orange-100 text-orange-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {userData.name}! 👋
              </h1>
              <p className="text-gray-600">
                Manage your campaigns and track your impact on the blockchain
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link to="/create-campaign">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Campaign
                </Link>
              </Button>
              {!userData.verified && (
                <Button asChild variant="outline">
                  <Link to="/verification">Complete Verification</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">${userData.totalDonated.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Donated</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{userData.campaignsCreated}</div>
                <div className="text-sm text-gray-600">Campaigns Created</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{userData.campaignsSupported}</div>
                <div className="text-sm text-gray-600">Campaigns Supported</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {userData.verified ? "Verified" : "Pending"}
                </div>
                <div className="text-sm text-gray-600">Account Status</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-96">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="donations">My Donations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Campaigns */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myCampaigns.slice(0, 3).map((campaign) => (
                        <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{campaign.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                                {campaign.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                ${campaign.raised.toLocaleString()} raised
                              </span>
                            </div>
                          </div>
                          <Button asChild variant="ghost" size="sm">
                            <Link to={`/campaign/${campaign.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Donations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Donations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myDonations.slice(0, 3).map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{donation.campaign}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-green-600 font-medium">
                                ${donation.amount}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(donation.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(donation.status)}`}>
                            {donation.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Campaigns</h2>
                <Button asChild>
                  <Link to="/create-campaign">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Campaign
                  </Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Raised: ${campaign.raised.toLocaleString()}</span>
                            <span>Goal: ${campaign.goal.toLocaleString()}</span>
                          </div>
                          <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="text-center">
                            <Users className="h-4 w-4 mx-auto mb-1" />
                            <div>{campaign.donors}</div>
                            <div className="text-xs">Donors</div>
                          </div>
                          <div className="text-center">
                            <Eye className="h-4 w-4 mx-auto mb-1" />
                            <div>{campaign.views}</div>
                            <div className="text-xs">Views</div>
                          </div>
                          <div className="text-center">
                            <Clock className="h-4 w-4 mx-auto mb-1" />
                            <div>{campaign.daysLeft}</div>
                            <div className="text-xs">Days</div>
                          </div>
                        </div>
                        
                        <Button asChild className="w-full">
                          <Link to={`/campaign/${campaign.id}`}>View Campaign</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="donations" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Donations</h2>
                <Button asChild variant="outline">
                  <Link to="/campaigns">Browse More Campaigns</Link>
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Campaign
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {myDonations.map((donation) => (
                          <tr key={donation.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {donation.campaign}
                                </div>
                                <div className="text-sm text-gray-500">
                                  by {donation.organizer}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-green-600">
                                ${donation.amount}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {new Date(donation.date).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={getStatusColor(donation.status)}>
                                {donation.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
