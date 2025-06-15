import React from 'react';
import { Button } from '@/components/ui/button';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import { useWaitlist } from '@/hooks/use-waitlist';

const Hero = () => {
  const {
    email,
    isSubmitting,
    showDialog,
    setShowDialog,
    handleFormSubmit
  } = useWaitlist();

  const scrollToApplication = () => {
    const applicationSection = document.getElementById('pilot-application');
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-dark bg-grid" style={{ paddingTop: '80px' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_40%)]"></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto text-center max-w-5xl px-4 py-8">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-up text-white">
            AI Doesn't Have to Be <span className="gradient-text">Scary</span>
          </h1>
          
          <h2 className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay-1">
            Meet Mark.ai, your personal AI employee that never sleeps—handling content, scheduling, and follow‑ups with human‑like understanding.
          </h2>
          
          <img 
            src="/images/mark_choosingOptions.png" 
            alt="Mark mascot with arms out and friendly message - Don't worry, he's friendly" 
            className="mx-auto w-80 h-80 object-contain animate-float" 
          />

          {/* Button with proper spacing */}
          <Button 
            onClick={scrollToApplication}
            className="h-12 lg:h-14 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-8 lg:px-10 text-base lg:text-lg animate-fade-up-delay-3"
          >
            Apply for the Pilot Program
          </Button>
          
          {/* Bullet Highlights */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto animate-fade-up-delay-2">
            <div className="glass p-4 lg:p-6 rounded-lg border border-white/10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <span className="text-xl lg:text-2xl">⚡</span>
              </div>
              <h3 className="text-base lg:text-lg font-semibold mb-2 text-white">Always On</h3>
              <p className="text-sm lg:text-base text-gray-400">24/7 availability, zero downtime.</p>
            </div>
            
            <div className="glass p-4 lg:p-6 rounded-lg border border-white/10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <span className="text-xl lg:text-2xl">🎯</span>
              </div>
              <h3 className="text-base lg:text-lg font-semibold mb-2 text-white">Brand Expert</h3>
              <p className="text-sm lg:text-base text-gray-400">Masters your voice and tone from day one.</p>
            </div>
            
            <div className="glass p-4 lg:p-6 rounded-lg border border-white/10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <span className="text-xl lg:text-2xl">🚀</span>
              </div>
              <h3 className="text-base lg:text-lg font-semibold mb-2 text-white">Task Tactician</h3>
              <p className="text-sm lg:text-base text-gray-400">Initiates and completes tasks proactively.</p>
            </div>
          </div>
          
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      
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

export default Hero;
