
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import { useWaitlist } from '@/hooks/use-waitlist';

const PilotApplication = () => {
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

  return (
    <section id="pilot-application" className="py-24 bg-gradient-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_40%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Shape the Future of Marketing?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Apply now to join 25 founding members in Mark.ai's Pilot Program.
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Apply Now'}
                </Button>
              </form>
            ) : (
              <div className="h-12 flex items-center justify-center space-x-2 bg-green-600/20 text-green-400 rounded-md border border-green-500/30 px-4">
                <Check size={20} />
                <span>Application submitted! Check your email for next steps.</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Waitlist Form Dialog */}
      <WaitlistForm 
        open={showDialog} 
        onOpenChange={setShowDialog} 
        onSubmit={handleFormSubmit}
        initialEmail={email}
        isSubmitting={isSubmitting}
      />
    </section>
  );
};

export default PilotApplication;
