
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Clock, Star, Trophy } from 'lucide-react';

const PilotProgram = () => {
  const scrollToApplication = () => {
    const applicationSection = document.getElementById('pilot-application');
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-24 bg-gradient-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(14,165,233,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Founding Member</h2>
          <h3 className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            Join 25 exclusive SMB pioneers for 30 days of free Mark.ai access. Provide weekly feedback to refine the platform.
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <div className="glass p-8 rounded-lg border border-white/10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Free Trial</h4>
            <p className="text-gray-400">Full‑featured usage for 30 days.</p>
          </div>

          <div className="glass p-8 rounded-lg border border-white/10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Your Role</h4>
            <p className="text-gray-400">Weekly 15–30 minute feedback sessions.</p>
          </div>

          <div className="glass p-8 rounded-lg border border-white/10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-600 to-red-500 flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Spots Limited</h4>
            <p className="text-gray-400">Only 25 participants.</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="glass p-8 rounded-lg border border-white/10 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-gray-300">
              Mark avatar holding a golden "Founding Member" badge, surrounded by a semi-circle of user avatars—highlighting exclusivity and community.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={scrollToApplication}
            className="h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-8"
          >
            Apply for the Pilot Program
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PilotProgram;
