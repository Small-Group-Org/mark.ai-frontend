import React from 'react';
import Navbar from '@/components/waitlist/layout/Navbar';
import Hero from '@/components/waitlist/sections/Hero';
import WhatIsMarkAI from '@/components/waitlist/sections/WhatIsMarkAI';
import HowMarkWorks from '@/components/waitlist/sections/HowMarkWorks';
import SolutionBenefits from '@/components/waitlist/sections/SolutionBenefits';
import ChatDemo from '@/components/waitlist/sections/ChatDemo';
import Roadmap from '@/components/waitlist/sections/Roadmap';
import PilotApplication from '@/components/waitlist/sections/PilotApplication';
import Footer from '@/components/waitlist/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

const WaitlistPage = () => {
  return (
    <div className="waitlist-page min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <ChatDemo />
      <WhatIsMarkAI />
      <HowMarkWorks />
      <SolutionBenefits />
      <Roadmap />
      <PilotApplication />
      <Footer />
      <Toaster />
    </div>
  );
};

export default WaitlistPage;