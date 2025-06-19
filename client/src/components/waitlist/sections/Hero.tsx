import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import { useWaitlist } from '@/hooks/use-waitlist';

interface HeroProps {
  backgroundColor?: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundColor = 'bg-dark-bg' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const {
    email,
    isSubmitting,
    showDialog,
    setShowDialog,
    handleFormSubmit
  } = useWaitlist();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToApplication = () => {
    const applicationSection = document.getElementById('pilot-application');
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`relative min-h-screen ${backgroundColor} overflow-hidden`} style={{ paddingTop: '80px' }}>
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
      <div className="absolute inset-0 bg-grid-enhanced opacity-50"></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto text-center max-w-6xl px-4 py-8">
        <div className="space-y-12">
          {/* Enhanced title with staggered animations */}
          <div className={`space-y-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              AI Doesn't Have to Be{' '}
              <span className="gradient-text-animated inline-block animate-neon-pulse">
                Scary
              </span>
            </h1>
            
            <div className="relative">
              <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Meet <span className="gradient-text-neon font-semibold">Mark.ai</span>, your personal AI employee that never sleeps—handling content, scheduling, and follow‑ups with human‑like understanding.
              </h2>
            </div>
          </div>
          
          {/* Enhanced mascot with floating animation */}
          <div className={`relative ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative inline-block">
              {/* Glowing aura behind mascot */}
              <div className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-10 animate-neon-pulse"></div>
              
              <img 
                src="/images/mark_choosingOptions.png" 
                alt="Mark mascot with arms out and friendly message - Don't worry, he's friendly" 
                className="relative z-10 mx-auto w-60 h-60 lg:w-80 lg:h-80 object-contain animate-float-gentle hover:scale-110 transition-transform duration-500" 
              />
              
              {/* Floating text bubble */}
              <div className="absolute -top-4 -right-4 bg-glass-bg backdrop-blur-md rounded-full px-4 py-2 text-sm text-white border border-white/20 animate-float-gentle z-20" style={{ animationDelay: '1s' }}>
                Don't worry, I'm friendly! 👋
              </div>
            </div>
          </div>

          {/* Enhanced CTA button with reduced size */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={scrollToApplication}
              className="group relative h-12 lg:h-14 bg-gradient-primary hover:bg-gradient-primary-hover text-white font-semibold px-8 lg:px-10 text-sm lg:text-base rounded-xl hover-lift hover-glow overflow-hidden"
            >
              <span className="relative z-10">Apply for the Pilot Program</span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </div>
          
          {/* Enhanced feature cards with staggered animations */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '⚡',
                title: 'Always On',
                description: '24/7 availability, zero downtime.',
                gradient: 'from-blue-500 to-cyan-400',
                delay: '0.9s'
              },
              {
                icon: '🎯',
                title: 'Brand Expert',
                description: 'Masters your voice and tone from day one.',
                gradient: 'from-purple-500 to-pink-400',
                delay: '1.2s'
              },
              {
                icon: '🚀',
                title: 'Task Tactician',
                description: 'Initiates and completes tasks proactively.',
                gradient: 'from-green-500 to-emerald-400',
                delay: '1.5s'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`glass-card p-6 lg:p-8 rounded-2xl hover-lift group cursor-pointer ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: feature.delay }}
              >
                {/* Icon with neon glow */}
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:animate-neon-pulse transition-all duration-300`}>
                  <span className="text-2xl lg:text-3xl filter drop-shadow-lg">{feature.icon}</span>
                </div>
                
                <h3 className="text-base lg:text-lg font-bold mb-3 text-white group-hover:gradient-text-neon transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-sm lg:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Card glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
              </div>
            ))}
          </div>
          
          {/* Social proof with animated counter */}
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '1.8s' }}>
            <div className="glass-enhanced rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex -space-x-2">
                  {['A', 'M', 'S', 'J', 'K'].map((initial, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-white/20 animate-float-gentle flex items-center justify-center text-white font-semibold text-sm"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white">
                    <span className="gradient-text-animated">247+</span>
                  </div>
                  <div className="text-sm text-gray-400">Early adopters</div>
                </div>
              </div>
            </div>
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

export default Hero;
