import React from 'react';
import Navbar from '@/components/waitlist/layout/Navbar';
import Hero from '@/components/waitlist/sections/Hero';
import WhatIsMarkAI from '@/components/waitlist/sections/WhatIsMarkAI';
import HowMarkWorks from '@/components/waitlist/sections/HowMarkWorks';
import ChatDemo from '@/components/waitlist/sections/ChatDemo';
import Roadmap from '@/components/waitlist/sections/Roadmap';
import PilotApplication from '@/components/waitlist/sections/PilotApplication';
import Footer from '@/components/waitlist/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

// Background color constants
const BG_COLOR_DARK = 'bg-dark-bg';
const BG_COLOR_LIGHT = 'bg-light-bg';

const WaitlistPage = () => {
  // Define sections with their components and alternating background colors
  const sections = [
    { Component: Hero },
    { Component: ChatDemo },
    { Component: WhatIsMarkAI },
    { Component: HowMarkWorks },
    { Component: Roadmap },
    { Component: PilotApplication },
    { Component: Footer },
  ];

  return (
    <div className="waitlist-page min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      {sections.map(({ Component }, index) => (
        <Component key={index} backgroundColor={index % 2 !== 0 ? BG_COLOR_LIGHT : BG_COLOR_DARK} />
      ))}
      <Toaster />
    </div>
  );
};

export default WaitlistPage;