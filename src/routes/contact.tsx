import { useState } from "react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle } from "lucide-react";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex-col w-full pb-24">
      <Container>
        <div className="my-8">
          <h2 className="text-3xl text-center md:text-left md:text-6xl">
            <span className="text-outline font-extrabold md:text-8xl">
              Contact Us
            </span>
            <span className="text-gray-500 font-extrabold">
              - We'd love to hear from you
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground text-sm">
            Have questions about our AI-powered interview preparation platform? 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We've received your message and will get back to you at the email address you provided.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsSubmitted(false);
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form className="space-y-4" action="https://formspree.io/f/xqaqlqwz" method="POST" onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  
                  fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                      'Accept': 'application/json'
                    }
                  })
                  .then(response => {
                    if (response.ok) {
                      setIsSubmitted(true);
                    } else {
                      throw new Error('Form submission failed');
                    }
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to send message. Please try again later.');
                  });
                }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <Button className="w-full" type="submit">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">anilankitha22@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">+91 8499046800</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    Amrita University Hostel<br />
                    Kasavanahalli<br />
                    Bangalore, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-100 p-6 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">Office Hours</h4>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday: 10:00 AM - 2:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <h3 className="text-2xl font-semibold mt-12 mb-4">Our Location</h3>
        <div className="w-full rounded-xl bg-gray-100 h-[320px] drop-shadow-md overflow-hidden relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5999450935384!2d77.67573953513958!3d12.894968690901946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1339d7500cd3%3A0x4b4fbdff03bfee09!2sAmrita%20Vishwa%20Vidyapeetam%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1714482943811!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Amrita University Hostel, Kasavanahalli, Bangalore"
          />

        </div>

        {/* FAQ Section */}
        <div className="my-16">
          <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">How does the AI Mock Interview work?</h4>
              <p className="text-gray-600">
                Our AI-powered platform simulates real interview scenarios, providing personalized feedback and insights to help you improve your interview skills.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">Is my data secure?</h4>
              <p className="text-gray-600">
                Yes, we take data security seriously. All your information is encrypted and stored securely according to industry standards.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">Can I get a refund?</h4>
              <p className="text-gray-600">
                We offer a 14-day money-back guarantee if you're not satisfied with our services. Please contact our support team for assistance.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">How do I schedule a mock interview?</h4>
              <p className="text-gray-600">
                Simply log in to your account, navigate to the "Generate" section, and follow the instructions to create and schedule your mock interview.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
