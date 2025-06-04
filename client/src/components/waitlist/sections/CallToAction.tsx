
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import { useWaitlist } from '@/hooks/use-waitlist';

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    email,
    setEmail,
    isSubmitting,
    isSubmitted,
    showDialog,
    setShowDialog,
    handleEmailSubmit,
    handleFormSubmit
  } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      
      // Show when scrolled 60% down the page
      if (scrollPosition > viewportHeight * 0.6 && scrollPosition < pageHeight - viewportHeight - 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Floating CTA */}
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="glass px-4 py-3 rounded-full flex items-center gap-4 border border-white/10 shadow-lg">
          <span className="text-sm font-medium hidden md:block">Ready to hire your first AI teammate?</span>
          <form onSubmit={handleEmailSubmit} className="flex items-center gap-2">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9 w-48 md:w-60 text-sm bg-white/10 border-white/20"
            />
            <Button 
              type="submit" 
              size="sm"
              className="h-9 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            >
              Join Now
            </Button>
          </form>
        </div>
      </div>

      {/* Main CTA Section */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden" id="waitlist">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_40%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Hire Your First AI Employee?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join the waitlist now to secure early access and exclusive benefits.
            </p>
            
            <div className="max-w-md mx-auto">
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button 
                    type="submit" 
                    className="h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-8"
                  >
                    Join Waitlist
                  </Button>
                </form>
              ) : (
                <div className="h-12 flex items-center justify-center space-x-2 bg-green-600/20 text-green-400 rounded-md border border-green-500/30 px-4">
                  <Check size={20} />
                  <span>You've joined the waitlist!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Waitlist Form Dialog */}
      <WaitlistForm 
        open={showDialog} 
        onOpenChange={setShowDialog} 
        onSubmit={handleFormSubmit}
        initialEmail={email}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default CallToAction;
