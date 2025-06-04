
import React from 'react';
import { User, Users, Palette, MessageCircle } from 'lucide-react';

const WhoShouldUse = () => {
  const userTypes = [
    {
      icon: User,
      title: "Solo Founders",
      description: "Reclaim 10+ hours per week.",
      outfit: "👨‍💼"
    },
    {
      icon: Users,
      title: "Small & Medium Teams", 
      description: "Instantly add an AI marketing coordinator.",
      outfit: "👥"
    },
    {
      icon: Palette,
      title: "Creative Agencies",
      description: "Scale campaigns without extra hires.",
      outfit: "🎨"
    },
    {
      icon: MessageCircle,
      title: "Consultants & Coaches",
      description: "Never miss a follow‑up or deadline.",
      outfit: "🎯"
    }
  ];

  return (
    <section className="py-24 bg-gradient-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(14,165,233,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect for These Teams</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
          {userTypes.map((type, index) => (
            <div key={index} className="glass p-8 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center">
              <div className="text-6xl mb-4">{type.outfit}</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <type.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{type.title}</h3>
              <p className="text-gray-400">{type.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="glass p-8 rounded-lg border border-white/10 max-w-3xl mx-auto">
            <div className="text-6xl mb-4">👔</div>
            <p className="text-gray-300">
              Mark avatar dressed in four different outfits (e.g., entrepreneur, office manager, creative director, coach) arranged in a grid—representing each user type.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoShouldUse;
