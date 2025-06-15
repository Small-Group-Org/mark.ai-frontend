import React from 'react';
import { Clock, Brain, Workflow, Target, Layers, Calendar, TrendingUp } from 'lucide-react';

const WhatIsMarkAI = () => {
  const features = [
    {
      icon: Brain,
      title: "Brand Expert", 
      description: "Learns and mirrors your unique style."
    },
    {
      icon: Layers,
      title: "Platform Specialist",
      description: "Optimizes every post for the unique tone and format of each channel."
    },
    {
      icon: Calendar,
      title: "Autonomous Publisher",
      description: "Automatically schedules and publishes your content."
    },
    {
      icon: TrendingUp,
      title: "Continuous Learner",
      description: "Improves with every edit and feedback you provide."
    }
  ];

  return (
    <section id="what-is-mark" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(139,92,246,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">What Is Mark.ai?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Not just another tool — a proactive AI employee built to handle your marketing tasks around the clock.
          </p>
        </div>

        <div className="text-center">
          <img 
            src="/images/mark_benefitsOfUsing.png" 
            alt="Mark avatar standing at a control panel with efficiency, consistency, scale, growth, and momentum badges - mastering all core capabilities" 
            className="mx-auto mb-8 w-80 h-80 object-contain" 
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glass p-6 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsMarkAI;
