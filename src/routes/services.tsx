import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Sparkles, Briefcase, Cpu, FileText, Video, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <div className="flex-col w-full pb-24">
      <Container>
        <div className="my-8">
          <h2 className="text-3xl text-center md:text-left md:text-6xl">
            <span className="text-outline font-extrabold md:text-8xl">
              Our Services
            </span>
            <span className="text-gray-500 font-extrabold">
              - Comprehensive interview preparation
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground text-sm">
            Discover our range of AI-powered services designed to help you excel in your job interviews.
            From mock interviews to voice analysis, we provide the tools you need to succeed.
          </p>
        </div>

        {/* Main Services Section */}
        <div className="my-16">
          <h3 className="text-2xl font-semibold mb-8">Core Services</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Mock Interviews */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Cpu className="text-blue-600 h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">AI Mock Interviews</h4>
              <p className="text-gray-600 mb-6">
                Practice with our AI interviewer that simulates real interview scenarios. Get asked industry-specific questions and receive instant feedback on your responses.
              </p>
              <Link to="/generate">
                <Button variant="outline" className="w-full">Try Now</Button>
              </Link>
            </div>
            
            {/* Voice Analysis */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <MessageSquare className="text-green-600 h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Voice Analysis</h4>
              <p className="text-gray-600 mb-6">
                Our advanced voice analysis technology evaluates your tone, confidence, and delivery. Get insights on your speech patterns and learn how to communicate more effectively.
              </p>
              <Link to="/generate">
                <Button variant="outline" className="w-full">Try Now</Button>
              </Link>
            </div>
            
            {/* Personalized Feedback */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <FileText className="text-purple-600 h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Personalized Feedback</h4>
              <p className="text-gray-600 mb-6">
                Receive detailed, personalized feedback on your interview performance. Understand your strengths and areas for improvement with actionable suggestions.
              </p>
              <Link to="/generate">
                <Button variant="outline" className="w-full">Try Now</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="my-16">
          <h3 className="text-2xl font-semibold mb-8">Specialized Services</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Industry-Specific Preparation */}
            <div className="flex gap-6 bg-gray-50 p-6 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Briefcase className="text-blue-600 h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Industry-Specific Preparation</h4>
                <p className="text-gray-600">
                  Get tailored interview preparation for your specific industry, whether it's tech, finance, healthcare, or any other field. Our AI adapts questions to match industry standards.
                </p>
              </div>
            </div>
            
            {/* Interview Coaching */}
            <div className="flex gap-6 bg-gray-50 p-6 rounded-xl">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Video className="text-green-600 h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Interview Coaching</h4>
                <p className="text-gray-600">
                  Learn effective interview techniques and strategies from our comprehensive coaching materials. Develop the skills to handle even the most challenging interview questions.
                </p>
              </div>
            </div>
            
            {/* Resume Review */}
            <div className="flex gap-6 bg-gray-50 p-6 rounded-xl">
              <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <FileText className="text-yellow-600 h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Resume Review</h4>
                <p className="text-gray-600">
                  Get your resume analyzed by our AI to ensure it highlights your skills and experiences effectively. Receive suggestions for improvements to increase your chances of landing interviews.
                </p>
              </div>
            </div>
            
            {/* Interview Question Library */}
            <div className="flex gap-6 bg-gray-50 p-6 rounded-xl">
              <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-red-600 h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Interview Question Library</h4>
                <p className="text-gray-600">
                  Access our extensive library of interview questions across various roles and industries. Practice answering common and challenging questions to build your confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Packages */}
        <div className="my-16">
          <h3 className="text-2xl font-semibold mb-8">Service Packages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-6">
                <h4 className="text-xl font-semibold">Basic</h4>
                <p className="text-3xl font-bold mt-2">Free</p>
                <p className="text-sm text-gray-500 mt-1">Limited access</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">3 AI Mock Interviews</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Basic Voice Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">General Feedback</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">Get Started</Button>
              </div>
            </div>
            
            {/* Pro Package */}
            <div className="border-2 border-blue-500 rounded-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-semibold">
                POPULAR
              </div>
              <div className="bg-blue-50 p-6">
                <h4 className="text-xl font-semibold">Pro</h4>
                <p className="text-3xl font-bold mt-2">$19.99</p>
                <p className="text-sm text-gray-500 mt-1">Monthly subscription</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Unlimited Mock Interviews</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Advanced Voice Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Detailed Personalized Feedback</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Industry-Specific Questions</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Subscribe Now</Button>
              </div>
            </div>
            
            {/* Enterprise Package */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-6">
                <h4 className="text-xl font-semibold">Enterprise</h4>
                <p className="text-3xl font-bold mt-2">Custom</p>
                <p className="text-sm text-gray-500 mt-1">Contact for pricing</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Team Management</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Custom Integration</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-600">Dedicated Support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center my-16 py-12 bg-gray-100 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Interview Skills?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your journey to interview success today with our AI-powered platform. 
            Choose the service that best fits your needs and take the first step toward landing your dream job.
          </p>
          <Link to="/generate">
            <Button className="px-8 py-6 text-lg">
              Get Started <Sparkles className="ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
