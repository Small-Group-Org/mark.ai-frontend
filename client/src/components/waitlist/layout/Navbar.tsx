import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import markAiLogo from '../../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] ${
        isScrolled ? 'backdrop-blur-xl bg-black/70' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-purple-500 text-2xl font-bold font-space-grotesk">
            <img src={markAiLogo} alt="Mark.AI" className="h-20" />
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">
            Benefits
          </a>
          <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
            Roadmap
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#waitlist">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-full px-6">
              Join Waitlist
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
