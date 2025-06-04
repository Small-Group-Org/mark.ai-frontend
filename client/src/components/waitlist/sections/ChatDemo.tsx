import React from 'react';
import { MessageSquare, User, Bot } from 'lucide-react';

const ChatDemo = () => {
  const chatMessages = [
    {
      type: 'user',
      message: "Hi Mark, I need to create content for our new product launch next week."
    },
    {
      type: 'bot',
      message: "Great! I'll help you create a comprehensive launch strategy. Based on your brand voice, I suggest we focus on the problem-solving aspect. Let me draft some content options for different platforms."
    },
    {
      type: 'bot',
      message: "Here's what I've prepared:\n\n📱 LinkedIn: Professional announcement highlighting ROI\n🐦 Twitter: Teaser thread with behind-the-scenes insights\n📧 Email: Detailed launch sequence for your subscribers\n\nShould I schedule these for optimal engagement times?"
    },
    {
      type: 'user',
      message: "Perfect! Yes, please schedule them. Also, can you set up follow-up reminders?"
    },
    {
      type: 'bot',
      message: "Done! ✅ Content scheduled for peak engagement times\n✅ Follow-up reminders set for 48h and 1 week\n✅ Analytics tracking enabled\n\nI'll monitor performance and suggest optimizations. Anything else for the launch?"
    }
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(14,165,233,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The 'AI Employee' Experience</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Sample chat transcript demonstrating Mark.ai's proactive planning and on‑brand content drafting.
          </p>
          
          <div className="mb-8">
            <img 
              src="/images/mark_thinking.png" 
              alt="Mark avatar with chat bubble - demonstrating conversational AI employee experience" 
              className="mx-auto w-64 h-64 object-contain" 
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-lg border border-white/10">
            <div className="flex items-center mb-6 pb-4 border-b border-white/10">
              <MessageSquare className="text-purple-400 mr-3" size={24} />
              <h3 className="text-lg font-semibold">Chat with Mark.ai</h3>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-400">Online</span>
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-500' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-500'
                    }`}>
                      {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`rounded-lg p-4 ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-500/20 border border-blue-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center text-sm text-gray-400">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                Mark is typing...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
