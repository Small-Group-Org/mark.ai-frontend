import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MessageSquare, User, Bot } from 'lucide-react';

const TYPING_DELAY = 2000; // Base delay in ms
const RANDOM_DELAY = 2000; // Additional random delay in ms
const INITIAL_MESSAGES = 2;

const ChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(INITIAL_MESSAGES);
  const [isAnimating, setIsAnimating] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const chatMessages = useMemo(() => [
    {
      type: 'bot',
      message: "Hi, I'm Mark. How can I help you today?"
    },
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
    },
    {
      type: 'user',
      message: "Great, thank you Mark!"
    },
    {
      type: 'bot',
      message: "You're welcome! If you need anything else, just let me know. Have a great day!"
    }
  ], []);

  const resetAnimation = useCallback(() => {
    setVisibleMessages(INITIAL_MESSAGES - 1);
    setIsAnimating(true);
  }, []);

  // Handle message animation
  useEffect(() => {
    if (!isAnimating) return;

    intervalRef.current = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev >= chatMessages.length) {
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, TYPING_DELAY + Math.random() * RANDOM_DELAY);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating, chatMessages.length]);

  // Handle intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          resetAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [resetAnimation]);

  const renderMessage = useCallback((msg: typeof chatMessages[0], index: number) => (
    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-primary`}>
          {msg.type === 'user' ? <User size={18} /> : <Bot size={20} />}
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
  ), []);

  return (
    <section ref={sectionRef} className="py-24 bg-light-bg relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(14,165,233,0.07),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">The 'AI Employee' Experience</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Sample chat transcript demonstrating Mark.ai's proactive planning and on‑brand content drafting.
          </p>   
        </div>

        <div id="how-mark-works" className="mb-12">
          <img 
            src="/images/mark_thinking.png" 
            alt="Mark avatar with chat bubble - demonstrating conversational AI employee experience" 
            className="mx-auto w-72 h-72 object-contain" 
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-lg border border-white/10">
            <div className="flex items-center mb-6 pb-4 border-b border-white/10">
              <MessageSquare className="text-purple-400 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-white">Chat with Mark.ai</h3>
              <div className="ml-auto flex items-center space-x-2 animate-blink">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-300">Online</span>
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {chatMessages.slice(0, visibleMessages).map(renderMessage)}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center text-sm text-gray-400 space-x-2">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                Mark is typing...
              </div>
              <div className="absolute bottom-6 right-6">
                <button
                  onClick={resetAnimation}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Reset Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
