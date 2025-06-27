
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle, Shield, FileText, User, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Verification = () => {
  const { toast } = useToast();
  const [verificationStep, setVerificationStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    organization: "",
    idDocument: null as File | null,
    organizationProof: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmitVerification = async () => {
    setIsSubmitting(true);
    
    // Simulate verification submission
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationStep(4);
      toast({
        title: "Verification Submitted! ✅",
        description: "Your documents have been submitted for review. We'll contact you within 2-3 business days.",
      });
    }, 2000);
  };

  const verificationSteps = [
    { step: 1, title: "Email Verification", completed: true },
    { step: 2, title: "Identity Verification", completed: false },
    { step:3, title: "Document Upload", completed: false },
    { step: 4, title: "Review Process", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Organizer Verification
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete your verification to start creating and managing campaigns
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Verification Progress</h3>
                <Badge className="bg-blue-100 text-blue-800">
                  Step {verificationStep} of 4
                </Badge>
              </div>
              <Progress value={(verificationStep / 4) * 100} className="h-2 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {verificationSteps.map((step) => (
                  <div key={step.step} className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2 ${
                      step.step <= verificationStep 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {step.step <= verificationStep ? <CheckCircle className="h-4 w-4" /> : step.step}
                    </div>
                    <p className="text-xs text-gray-600">{step.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          {verificationStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-6 w-6 text-green-500" />
                  Email Verification Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <h4 className="font-semibold text-green-800">Email Verified Successfully</h4>
                    <p className="text-green-700">Your email address has been confirmed and verified.</p>
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={() => setVerificationStep(2)} size="lg">
                    Continue to Identity Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {verificationStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6 text-blue-500" />
                  Identity Verification
                </CardTitle>
                <p className="text-gray-600">Provide your personal information for verification</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input
                      placeholder="Enter your full legal name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Organization Name (Optional)</label>
                  <Input
                    placeholder="Enter organization name if applicable"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <Button 
                    onClick={() => setVerificationStep(3)} 
                    size="lg"
                    disabled={!formData.fullName || !formData.email}
                  >
                    Continue to Document Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {verificationStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-purple-500" />
                  Document Upload
                </CardTitle>
                <p className="text-gray-600">Upload required documents for verification</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Government ID *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload a clear photo of your government-issued ID</p>
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload("idDocument", file);
                      }}
                      className="max-w-xs mx-auto"
                    />
                    {formData.idDocument && (
                      <Badge className="bg-green-100 text-green-800 mt-2">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {formData.idDocument.name}
                      </Badge>
                    )}
                  </div>
                </div>

                {formData.organization && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Organization Proof</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload registration certificate or proof of organization</p>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload("organizationProof", file);
                        }}
                        className="max-w-xs mx-auto"
                      />
                      {formData.organizationProof && (
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {formData.organizationProof.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Document Security</h4>
                      <p className="text-blue-800 text-sm">
                        Your documents are encrypted and stored securely. They're only used for verification purposes and are never shared with third parties.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={handleSubmitVerification} 
                    size="lg"
                    disabled={!formData.idDocument || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit for Review"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {verificationStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-orange-500" />
                  Under Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Verification Under Review</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for submitting your verification documents. Our team is currently reviewing your application. 
                    This process typically takes 2-3 business days.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">What happens next?</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Our verification team reviews your documents</li>
                      <li>• You'll receive an email notification with the results</li>
                      <li>• Once approved, you can create and manage campaigns</li>
                      <li>• If additional information is needed, we'll contact you</li>
                    </ul>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button asChild variant="outline">
                      <Link to="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/campaigns">Browse Campaigns</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
