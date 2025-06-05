import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import { useWaitlist } from '@/hooks/use-waitlist';

const Hero = () => {
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

  const scrollToApplication = () => {
    const applicationSection = document.getElementById('pilot-application');
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-dark bg-grid px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_40%)]"></div>
      
      <div className="relative z-10 top-28 container mx-auto text-center max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up text-white">
          AI Doesn't Have to Be <span className="gradient-text">Scary</span>
        </h1>
        
        <h2 className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-up-delay-1">
          Meet Mark.ai, your personal AI employee that never sleeps—handling content, scheduling, and follow‑ups with human‑like understanding.
        </h2>
        
        <img 
          src="/images/mark_choosingOptions.png" 
          alt="Mark mascot with arms out and friendly message - Don't worry, he's friendly" 
          className="mx-auto mb-4 w-72 h-72 object-contain animate-float" 
        />
        
        {/* Bullet Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto animate-fade-up-delay-2">
          <div className="glass p-6 rounded-lg border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Always On</h3>
            <p className="text-gray-400">24/7 availability, zero downtime.</p>
          </div>
          
          <div className="glass p-6 rounded-lg border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Brand Expert</h3>
            <p className="text-gray-400">Masters your voice and tone from day one.</p>
          </div>
          
          <div className="glass p-6 rounded-lg border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Task Tactician</h3>
            <p className="text-gray-400">Initiates and completes tasks proactively.</p>
          </div>
        </div>
        
        <Button 
          onClick={scrollToApplication}
          className="h-14 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-10 text-lg animate-fade-up-delay-3 mb-20"
        >
          Apply for the Pilot Program
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"></div>
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gray-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div> */}
      
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
