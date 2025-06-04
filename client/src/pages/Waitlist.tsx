import React from 'react';
import Navbar from '@/components/waitlist/layout/Navbar';
import Hero from '@/components/waitlist/sections/Hero';
import WhatIsMarkAI from '@/components/waitlist/sections/WhatIsMarkAI';
import PilotProgram from '@/components/waitlist/sections/PilotProgram';
import HowMarkWorks from '@/components/waitlist/sections/HowMarkWorks';
import WhoShouldUse from '@/components/waitlist/sections/WhoShouldUse';
import SolutionBenefits from '@/components/waitlist/sections/SolutionBenefits';
import PilotDetails from '@/components/waitlist/sections/PilotDetails';
import ChatDemo from '@/components/waitlist/sections/ChatDemo';
import AiTeammate from '@/components/waitlist/sections/AiTeammate';
import Features from '@/components/waitlist/sections/Features';
import Benefits from '@/components/waitlist/sections/Benefits';
import Roadmap from '@/components/waitlist/sections/Roadmap';
import CallToAction from '@/components/waitlist/sections/CallToAction';
import PilotApplication from '@/components/waitlist/sections/PilotApplication';
import Footer from '@/components/waitlist/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

const WaitlistPage = () => {
    console.log('WaitlistPage');
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatIsMarkAI />
      <PilotProgram />
      <HowMarkWorks />
      <WhoShouldUse />
      <SolutionBenefits />
      <PilotDetails />
      <ChatDemo />
      <AiTeammate />
      <Features />
      <Benefits />
      <Roadmap />
      <CallToAction />
      <PilotApplication />
      <Footer />
      <Toaster />
    </div>
  );
};

export default WaitlistPage;