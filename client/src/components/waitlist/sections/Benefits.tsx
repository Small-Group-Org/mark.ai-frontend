
import React, { useState } from 'react';

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const benefits = [
    {
      title: "Lifetime Discount",
      description: "Join the waitlist now and lock in a special lifetime discount when we launch.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" x2="5" y1="5" y2="19"></line>
          <circle cx="6.5" cy="6.5" r="2.5"></circle>
          <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
      )
    },
    {
      title: "Early Access",
      description: "Be among the first to experience Mark.AI and get access to exclusive team features.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17h.01M3 12h18M3 7h.01M13 7h.01M13 17h.01M19 17h.01M19 7h.01"></path>
        </svg>
      )
    },
    {
      title: "Influence Development",
      description: "Provide direct feedback to our team and help shape the future of Mark.AI.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      )
    },
    {
      title: "Founding Community",
      description: "Join our exclusive community of early adopters to share strategies and insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Join the Waitlist?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Be part of our founding community and enjoy these exclusive benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl transition-all duration-500 relative ${
                hoveredIndex === index
                  ? 'gradient-border bg-purple-900/10'
                  : 'border border-gray-800 bg-gray-900/20'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                hoveredIndex === index 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' 
                  : 'bg-gray-800 text-gray-400'
              }`}>
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
              
              {hoveredIndex === index && (
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center animate-ping-slow opacity-70"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
