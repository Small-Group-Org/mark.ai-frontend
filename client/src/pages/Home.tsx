import React from 'react';
import Navbar from '@/components/waitlist/layout/Navbar';
import HomeHero from '@/components/waitlist/sections/HomeHero';
import ChatDemo from '@/components/waitlist/sections/ChatDemo';
import WhatIsMarkAI from '@/components/waitlist/sections/WhatIsMarkAI';
import HowMarkWorks from '@/components/waitlist/sections/HowMarkWorks';
import Roadmap from '@/components/waitlist/sections/Roadmap';
import Footer from '@/components/waitlist/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthModal } from '@/components/auth/AuthModal';

// Background color constants
const BG_COLOR_DARK = 'bg-dark-bg';
const BG_COLOR_LIGHT = 'bg-light-bg';

export default function Home() {
  // Define sections with their components and alternating background colors
  const sections = [
    { Component: HomeHero },
    { Component: ChatDemo },
    { Component: WhatIsMarkAI },
    { Component: HowMarkWorks },
    { Component: Roadmap },
    { Component: Footer },
  ];

  return (
    <div className="mark-pages min-h-screen text-foreground overflow-x-hidden">
      <Navbar variant="home" />
      {sections.map(({ Component }, index) => (
        <Component key={index} backgroundColor={index % 2 !== 0 ? BG_COLOR_LIGHT : BG_COLOR_DARK} />
      ))}
      <Toaster />
      <AuthModal />
    </div>
  );
}
