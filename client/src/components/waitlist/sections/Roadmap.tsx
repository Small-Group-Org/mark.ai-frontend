
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Roadmap = () => {
  const roadmapItems = [
    {
      date: "June 2025",
      title: "Alpha Launch",
      description: "Early access to Mark.ai with core features: content assistance, scheduling, and brand voice learning.",
      status: "upcoming",
      color: "purple"
    },
    {
      date: "July 2025",
      title: "Beta Launch",
      description: "Team management tools, analytics dashboard, join team meetings to summarise, and brainstorm mode.",
      status: "planned",
      color: "blue"
    },
    {
      date: "Late 2025",
      title: "Public Launch",
      description: "Multi-brand agency worksapce with email, image generation and SAAS integrations.",
      status: "planned",
      color: "emerald"
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(14,165,233,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What's Coming Next</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our roadmap to building the ultimate AI marketing employee
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-blue-600 to-emerald-600"></div>

            {roadmapItems.map((item, index) => (
              <div key={index} className="relative mb-12">
                <div className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline point */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 border-4 border-black"></div>
                  
                  <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} md:w-1/2`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 bg-${item.color}-500/20 text-${item.color}-400`}>
                      {item.date}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className={`text-gray-400 mb-4 ${item.title.includes("Beta") ? '' : ''}`}>{item.description}</p>
                    
                    <div className={`flex items-center ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {item.status === 'upcoming' ? (
                        <span className="flex items-center text-purple-400 text-sm">
                          <span className="w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
                          Launching soon
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-500 text-sm">
                          <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
