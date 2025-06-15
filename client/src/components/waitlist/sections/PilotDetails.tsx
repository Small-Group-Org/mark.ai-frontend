import React from 'react';
import { Key, Users, Calendar, MessageSquare, Gift, Percent, Crown, Heart } from 'lucide-react';

const PilotDetails = () => {
  const benefits = [
    {
      icon: Key,
      title: "Exclusive early feature access"
    },
    {
      icon: Crown,
      title: "Direct influence on product roadmap"
    },
    {
      icon: Percent,
      title: "25% lifetime discount after launch"
    },
    {
      icon: Heart,
      title: "Community of fellow SMB pioneers"
    }
  ];

  const requirements = [
    {
      icon: Calendar,
      title: "30 days of active Mark.ai usage"
    },
    {
      icon: MessageSquare,
      title: "Weekly 15–30 minute feedback calls"
    },
    {
      icon: Users,
      title: "Only 25 spots available"
    },
    {
      icon: Heart,
      title: "Honest, candid insights"
    }
  ];

  return (
    <section className="py-24 bg-light-bg relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Pilot Program Details</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
              <span className="text-6xl mr-4">🗝️</span>Benefits
            </h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="glass p-6 rounded-lg border border-white/10 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={20} className="text-white" />
                  </div>
                  <p className="text-gray-300 pt-2">{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
              <span className="text-6xl mr-4">📋</span>Requirements
            </h3>
            <div className="space-y-6">
              {requirements.map((requirement, index) => (
                <div key={index} className="glass p-6 rounded-lg border border-white/10 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <requirement.icon size={20} className="text-white" />
                  </div>
                  <p className="text-gray-300 pt-2">{requirement.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="glass p-8 rounded-lg border border-white/10 max-w-4xl mx-auto">
            <img 
              src="/images/mark_splitVisual.png" 
              alt="Split visual: Mark avatar with golden key (benefits) and Mark avatar with checklist (requirements)" 
              className="mx-auto mb-4 w-full max-w-2xl h-auto object-contain" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PilotDetails;
