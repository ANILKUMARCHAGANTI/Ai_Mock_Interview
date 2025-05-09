import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="flex-col w-full pb-24">
      <Container>
        <div className="my-8">
          <h2 className="text-3xl text-center md:text-left md:text-6xl">
            <span className="text-outline font-extrabold md:text-8xl">
              About Us
            </span>
            <span className="text-gray-500 font-extrabold">
              - Revolutionizing interview preparation
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground text-sm">
            AI Mock Interview is an innovative platform designed to help job seekers prepare for
            interviews with AI-powered feedback and analysis. Our mission is to make interview
            preparation accessible, effective, and personalized for everyone.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              AI Mock Interview was born from a simple observation: traditional interview preparation
              methods often fail to provide personalized feedback and realistic practice environments.
            </p>
            <p className="text-gray-600 mb-4">
              We set out to create a platform that leverages the power of artificial intelligence to
              simulate real interview scenarios, provide instant feedback, and help candidates improve
              their interview skills in a safe, judgment-free environment.
            </p>
            <p className="text-gray-600">
              Today, our platform has helped thousands of job seekers land their dream jobs by providing
              them with the tools and confidence they need to succeed in interviews.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <img
              src="/assets/img/office.jpg"
              alt="Our Team"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h4 className="font-semibold text-xl mb-2">Our Mission</h4>
            <p className="text-gray-600">
              To democratize interview preparation by making professional-grade interview coaching
              accessible to everyone through AI technology.
            </p>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="my-16">
          <h3 className="text-2xl font-semibold mb-8">Key Features of Our Platform</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">AI-Powered Interviews</h4>
              <p className="text-gray-600">
                Our platform uses advanced AI to simulate realistic interview scenarios across various industries and job roles.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Real-time Voice Analysis</h4>
              <p className="text-gray-600">
                Get instant feedback on your speech patterns, confidence level, and delivery through our advanced voice analysis technology.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Personalized Feedback</h4>
              <p className="text-gray-600">
                Receive detailed, personalized feedback on your responses, highlighting strengths and areas for improvement.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="my-16">
          <h3 className="text-2xl font-semibold mb-8">How It Works</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Create Your Interview</h4>
                <p className="text-gray-600">
                  Select your industry, job role, and experience level to generate a customized interview experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Practice with AI</h4>
                <p className="text-gray-600">
                  Engage in a realistic interview with our AI interviewer, which adapts questions based on your responses.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Receive Detailed Analysis</h4>
                <p className="text-gray-600">
                  Get comprehensive feedback on your performance, including voice analysis, content evaluation, and improvement suggestions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Improve and Iterate</h4>
                <p className="text-gray-600">
                  Use the feedback to refine your responses and practice again until you feel confident and prepared.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="my-16 bg-gray-50 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold mb-8">What Our Users Say</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="/assets/img/anilpicture.jpg" 
                  alt="Anil Kumar" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">M.M.S.Pavan</h4>
                  <p className="text-sm text-gray-500">Founder & Developer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I created AI Mock Interview to help job seekers gain confidence and improve their interview skills. Our voice analysis technology provides unbiased feedback that helps candidates understand their strengths and areas for improvement."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
              <img 
                  src="/assets/img/anilpicture2.jpg" 
                  alt="Anil Kumar" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                                <div>
                  <h4 className="font-medium">Deepu</h4>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was nervous about my upcoming interviews, but after practicing with this platform, I felt much more confident. The voice analysis feature helped me improve my delivery significantly."
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center my-16 py-12 bg-gray-100 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Ready to Ace Your Next Interview?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have transformed their interview skills and landed their dream jobs with AI Mock Interview.
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

export default AboutPage;
