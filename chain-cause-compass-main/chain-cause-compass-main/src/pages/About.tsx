
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Heart, Users, Globe, Lock, Zap, CheckCircle, Mail, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "All transactions are secured by blockchain technology, ensuring immutable records and complete transparency."
    },
    {
      icon: Heart,
      title: "Direct Impact",
      description: "100% of your donations go directly to verified causes, with no hidden fees or intermediaries."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community. Every stakeholder has a voice in our platform's evolution."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Support causes worldwide with instant, borderless transactions powered by cryptocurrency."
    },
    {
      icon: Lock,
      title: "Verified Campaigns",
      description: "Every campaign undergoes rigorous verification to ensure legitimacy and prevent fraud."
    },
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Track your donations in real-time and see exactly how funds are being utilized by organizations."
    }
  ];

  const teamMembers = [
    {
      name: "Vishwas Sharma",
      role: "Developer",
      bio: "Computer science student focused on building clean, user-friendly interfaces. Designs and develops the platform’s frontend to ensure accessibility and transparency for all users.",
      image: "👨‍🏫"
    },
    {
      name: "Nishmith",
      role: "Blockchain & Smart Contract Learner",
      bio: "Computer Science student exploring how smart contracts work. Experiments with simple blockchain code and tests features.",
      image: "👨‍💻"
    },
    {
      name: "H Varsha Ravishankar",
      role: "Team Lead",
      bio: "Engineering student interested in blockchain and digital trust. Coordinates tasks, keeps the team organized, and learns backend basics.",
      image: "👩‍🏫"
    },
    {
      name: "Disha Y H",
      role: "Blockchain Architect",
      bio: "Engineering student helping with connecting different parts of the project. Learns how to store files on IPFS and supports basic platform integration.",
      image: "👩‍💻"
    }
  ];

  const stats = [
    { value: "$2.4M+", label: "Total Raised" },
    { value: "156", label: "Active Campaigns" },
    { value: "12.5K+", label: "Donors" },
    { value: "94%", label: "Success Rate" }
  ];

  const faqs = [
    {
      question: "How does blockchain ensure transparency?",
      answer: "Every transaction is recorded on the blockchain, creating an immutable public ledger. Donors can track their contributions and see exactly how funds are being used in real-time."
    },
    {
      question: "What cryptocurrencies do you accept?",
      answer: "We currently accept major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), and USDC. We're continuously adding support for more currencies based on community demand."
    },
    {
      question: "How are campaigns verified?",
      answer: "Our verification process includes identity verification of organizers, documentation review, and ongoing monitoring of campaign progress. Only verified campaigns can receive donations."
    },
    {
      question: "Are there any fees?",
      answer: "We charge a small platform fee (2.5%) to cover operational costs. This is significantly lower than traditional crowdfunding platforms, and 100% transparent."
    },
    {
      question: "What happens if a campaign doesn't reach its goal?",
      answer: "Donors can choose to get refunds if milestones aren't met, or allow partial funding to continue the project. Our smart contracts handle refunds automatically based on campaign terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">About KindaKind</Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Revolutionizing Charitable Giving
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              We're building the future of transparent philanthropy, where every donation is tracked, 
              verified, and makes a measurable impact through the power of blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/campaigns">Explore Campaigns</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/create-campaign">Start Your Campaign</Link>
              </Button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                  <p className="text-xl opacity-90 mb-8">
                    To create a world where charitable giving is completely transparent, efficient, and impactful. 
                    We believe that by leveraging blockchain technology, we can eliminate fraud, reduce costs, 
                    and ensure that every dollar donated reaches its intended purpose.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Transparency</h3>
                      <p className="text-sm opacity-90">Every transaction is public and verifiable</p>
                    </div>
                    <div>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Impact</h3>
                      <p className="text-sm opacity-90">Maximizing the impact of every donation</p>
                    </div>
                    <div>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Community</h3>
                      <p className="text-sm opacity-90">Building a global community of givers</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose KindaKind?
              </h2>
              <p className="text-xl text-gray-600">
                Experience the future of charitable giving with our innovative features
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600">
                Passionate individuals working to revolutionize charitable giving
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-6xl mb-4">{member.image}</div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get In Touch
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Have questions about our platform? Want to partner with us? 
                  We'd love to hear from you and discuss how we can work together.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Us
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Join Our Community
                  </Button>
                </div> */}
                <div className="mt-8 text-sm text-gray-600">
                  <p>Email: officiallyacoder@gmail.com</p>
                  {/* <p>Support: support@blockcharity.org</p> */}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of donors and organizations creating positive change 
                  through transparent, blockchain-powered charitable giving.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/campaigns">Browse Campaigns</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-blue-600">
                    <Link to="/login">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
