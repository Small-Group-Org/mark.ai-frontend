import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import markAiLogo from '../../../../public/images/logos/mark-logo-light.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToApplication = () => {
    const applicationSection = document.getElementById('pilot-application');
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 140;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] ${
        isScrolled ? 'backdrop-blur-xl bg-black/70' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div>
          <img src={markAiLogo} alt="Mark.AI" className="h-10" />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#what-is-mark" className="text-gray-300 hover:text-white transition-colors">
            What is Mark
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-mark-works');
            }}
          >
            How it Works
          </a>
          <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
            Roadmap
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            onClick={scrollToApplication}
            className="bg-gradient-primary hover:bg-gradient-primary-hover text-white rounded-full px-6"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
