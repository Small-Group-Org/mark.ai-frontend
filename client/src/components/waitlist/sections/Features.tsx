
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Learns Your Brand Voice",
      description: "Mark.AI adapts to your unique tone and style, becoming an extension of your team's voice.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8c2.76 0 5 2.24 5 5 0 2.76-2.24 5-5 5a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5z"/>
            <path d="M8 2a3 3 0 0 0-3 3v7"/>
            <path d="M16 2a3 3 0 0 1 3 3v7"/>
            <path d="M8 22V19"/>
            <path d="M16 22v-3"/>
          </svg>
        </div>
      )
    },
    {
      title: "Handles Marketing Tasks",
      description: "From social media posting to task reminders, Mark.AI takes care of repetitive marketing work.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            <path d="m15 5 3 3"/>
          </svg>
        </div>
      )
    },
    {
      title: "Works Through Chat",
      description: "No need for complex prompts - just chat naturally like you would with a real team member.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 8 4-4 4 4"/>
            <path d="M7 4v16"/>
            <path d="m21 16-4 4-4-4"/>
            <path d="M17 20V4"/>
          </svg>
        </div>
      )
    },
    {
      title: "Saves Hours Weekly",
      description: "Reclaim 10+ hours per week by automating repetitive marketing tasks and content creation.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What is Mark.AI?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Not just another tool — a proactive AI employee built to handle your marketing tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm hover:border-purple-900/50 transition-all duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <a href="#waitlist" className="text-purple-400 flex items-center text-sm font-medium">
                Learn more
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
