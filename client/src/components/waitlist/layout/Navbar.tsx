import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import markAiLogo from '../../../../public/images/logos/mark-logo-light-grad.png';

interface NavbarProps {
  variant?: 'home' | 'waitlist';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'waitlist' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsOpen: onOpen, setView, logout, isAuth } = useAuthStore();
  const [, setLocation] = useLocation();

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
      const offset = 120;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const renderButtons = () => {
    if (variant === 'home') {
      // Show authentication buttons for Home page
      if (isAuth) {
        return (
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => setLocation('/create')}
              className="bg-slate-800 hover:bg-slate-700 text-white rounded-full px-6 text-sm"
            >
              Create Post
            </Button>
            <Button 
              onClick={async () => {
                await logout();
              }}
              className="bg-gradient-primary hover:bg-gradient-primary-hover text-white rounded-full px-6 text-sm"
            >
              Sign out
            </Button>
          </div>
        );
      } else {
        return (
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => {
                setView('signin');
                onOpen(true);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-white rounded-full px-6 text-sm"
            >
              Sign in
            </Button>
            <Button 
              onClick={() => {
                setView('signup');
                onOpen(true);
              }}
              className="bg-gradient-primary hover:bg-gradient-primary-hover text-white rounded-full px-6 text-sm"
            >
              Sign up
            </Button>
          </div>
        );
      }
    } else {
      // Show Join Waitlist button for Waitlist page
      return (
        <Button 
          onClick={scrollToApplication}
          className="bg-gradient-primary hover:bg-gradient-primary-hover text-white rounded-full px-6"
        >
          Join Waitlist
        </Button>
      );
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] ${
        isScrolled ? 'backdrop-blur-xl bg-dark-bg/70' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div>
          <img src={markAiLogo} alt="Mark.AI" className="h-12 mt-1" />
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
          {renderButtons()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
