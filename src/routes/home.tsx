import { Container } from "@/components/container";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { MarqueImg } from "@/components/marquee-img";
import { Link } from "react-router-dom";

const HomePage = () => {

  return <div className="flex-col w-full pb-24">
    <Container>
    <div className="my-8">
          <h2 className="text-3xl text-center md:text-left md:text-6xl">
            <span className=" text-outline font-extrabold md:text-8xl">
              AI Superpower
            </span>
            <span className="text-gray-500 font-extrabold">
              - A better way to
            </span>
            <br />
            improve your interview chances and skills
          </h2>

          <p className="mt-4 text-muted-foreground text-sm">
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </p>
        </div>
        <div className="flex w-full items-center justify-evenly md:px-12 md:py-16 md:items-center md:justify-end gap-12">
          <p className="text-3xl font-semibold text-gray-900 text-center">
            250k+
            <span className="block text-xl text-muted-foreground font-normal">
              Offers Recieved
            </span>
          </p>
          <p className="text-3xl font-semibold text-gray-900 text-center">
            1.2M+
            <span className="block text-xl text-muted-foreground font-normal">
              Interview Aced
            </span>
          </p>
        </div>

        {/* image section */}
        <div className="w-full mt-4 rounded-xl bg-gray-100 h-[420px] drop-shadow-md overflow-hidden relative">
          <img
            src="/assets/img/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/40 backdrop-blur-md">
            Inteviews Copilot&copy;
          </div>

          <div className="hidden md:block absolute w-80 bottom-4 right-4 px-4 py-2 rounded-md bg-white/60 backdrop-blur-md">
            <h2 className="text-neutral-800 font-semibold">Developer</h2>
            <p className="text-sm text-neutral-500">
              Enhance your interview skills with AI-powered feedback. Practice real scenarios and get instant analysis to improve your performance.
            </p>

            <Button className="mt-3">
              Generate <Sparkles />
            </Button>
          </div>
          </div>
    </Container>

    {/* marquee section */}
    <div className="w-full my-12">
      <Marquee pauseOnHover>
      <MarqueImg img="/assets/img/logo/firebase.png" />
          <MarqueImg img="/assets/img/logo/meet.png" />
          <MarqueImg img="/assets/img/logo/zoom.png" />
          <MarqueImg img="/assets/img/logo/firebase.png" />
          <MarqueImg img="/assets/img/logo/microsoft.png" />
          <MarqueImg img="/assets/img/logo/meet.png" />
          <MarqueImg img="/assets/img/logo/tailwindcss.png" />
          <MarqueImg img="/assets/img/logo/microsoft.png" />
      </Marquee>
    </div>
    <Container className="py-8 space-y-8">
        <h2 className="tracking-wide text-xl text-gray-800 font-semibold">
          Unleash your potential with personalized AI insights and targeted
          interview practice.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="col-span-1 md:col-span-3">
            <img
              src="/assets/img/office.jpg"
              alt=""
              className="w-full max-h-96 rounded-md object-cover"
            />
          </div>

          <div className="col-span-1 md:col-span-2 gap-8 max-h-96 min-h-96 w-full flex flex-col items-center justify-center text-center">
            <p className="text-center text-muted-foreground">
              Transform the way you prepare, gain confidence, and boost your
              chances of landing your dream job. Let AI be your edge in
              today&apos;s competitive job market.
            </p>

            <Link to={"/generate"} className="w-full">
              <Button className="w-3/4">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Voice Analysis Feature Section */}
      <Container className="py-12 bg-gray-50 my-12 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">Advanced Voice Analysis</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered voice analysis provides unbiased feedback on your interview responses.
            Get insights on your confidence level, speech clarity, and content relevance - all in real-time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" x2="9.01" y1="9" y2="9"></line>
                  <line x1="15" x2="15.01" y1="9" y2="9"></line>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Sentiment Analysis</h3>
                <p className="text-gray-600">
                  Understand the emotional tone of your responses and how they might be perceived by interviewers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="10" r="3"></circle>
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Domain Knowledge</h3>
                <p className="text-gray-600">
                  Get feedback on your technical knowledge and how well you communicate complex concepts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Voice Tone Analysis</h3>
                <p className="text-gray-600">
                  Learn how your speaking style, pace, and clarity impact the effectiveness of your communication.
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-left mt-8">
              <Link to="/generate">
                <Button size="lg" className="px-6">Try Voice Analysis <Sparkles className="ml-2" /></Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
              <h3 className="text-xl font-medium">Voice Analysis</h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="8" y2="12"></line>
                <line x1="12" x2="12.01" y1="16" y2="16"></line>
              </svg>
            </div>
            <p className="text-sm text-gray-500 mb-5">Unbiased assessment of the candidate's response</p>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" x2="9.01" y1="9" y2="9"></line>
                  <line x1="15" x2="15.01" y1="9" y2="9"></line>
                </svg>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Sentiment</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">positive</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="10" r="3"></circle>
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                </svg>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Domain Knowledge</span>
                  </div>
                  <span className="text-sm text-gray-600">excellent</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Voice Tone</span>
                  </div>
                  <span className="text-sm text-gray-600">clear, professional, confident</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Confidence Score</span>
                  <span className="font-medium">9/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-2" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Overall Assessment</h4>
              <p className="text-sm text-gray-600">
                The candidate's response demonstrates exceptional technical knowledge and clear communication skills. They articulated complex concepts with precision and confidence, showing deep understanding of the subject matter. The professional tone and well-structured answer would leave a very positive impression on interviewers.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Statistics Section */}
      <div className="bg-gray-900 text-white py-16 my-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Empowering Interview Success</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform has helped thousands of candidates prepare for interviews and land their dream jobs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2 text-blue-400">98%</div>
              <p className="text-gray-300">Users report increased confidence after practice sessions</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold mb-2 text-green-400">85%</div>
              <p className="text-gray-300">Higher interview success rate compared to traditional preparation</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold mb-2 text-purple-400">50K+</div>
              <p className="text-gray-300">Mock interviews conducted on our platform monthly</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold mb-2 text-yellow-400">24/7</div>
              <p className="text-gray-300">Access to AI-powered interview practice anytime, anywhere</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Testimonials Section */}
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thousands of job seekers have improved their interview skills and landed their dream jobs with AI Mock Interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-xl">S</span>
              </div>
              <div>
                <h4 className="font-medium">Dinesh</h4>
                <p className="text-sm text-gray-500">Software Engineer</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The voice analysis feature gave me insights I never would have noticed on my own. After practicing with AI Mock Interview, I felt much more confident and landed offers from three top tech companies!"
            </p>
            <div className="mt-4 flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-green-600 font-bold text-xl">M</span>
              </div>
              <div>
                <h4 className="font-medium">Tejesh Chen</h4>
                <p className="text-sm text-gray-500">Product Manager</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The domain knowledge assessment helped me identify gaps in my understanding. After a week of targeted practice, I was able to speak confidently about complex product strategies in my interviews."
            </p>
            <div className="mt-4 flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold text-xl">P</span>
              </div>
              <div>
                <h4 className="font-medium">Sai</h4>
                <p className="text-sm text-gray-500">Data Scientist</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The confidence score and voice tone analysis helped me realize I was speaking too quickly and sounding unsure. After practicing with AI Mock Interview, I improved my delivery and got my dream job!"
            </p>
            <div className="mt-4 flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" className="mr-1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/generate">
            <Button size="lg" className="px-8">
              Try It Yourself <Sparkles className="ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
  </div>
  
};

export default HomePage;