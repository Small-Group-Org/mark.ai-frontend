import React, { useState, useEffect } from 'react';
import ChatInterface, { MessageType } from '@/components/ChatInterface';
import { SecondMessageModal } from '@/components/SignUpPromptModal';
import markImage from '../../../assets/mark.png';
import { useLocation } from 'wouter';
import { initialMessages } from '@/commons/constant';
import { useAuthStore } from '@/store/useAuthStore';

interface HomeHeroProps {
  backgroundColor?: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({ backgroundColor = 'bg-dark-bg' }) => {
  // Auth states
  const { setView, userDetails: user, isAuth } = useAuthStore();
  const [, setLocation] = useLocation();

  // State to control animation of messages
  const [visibleMessages, setVisibleMessages] = useState<MessageType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showSecondMessageModal, setShowSecondMessageModal] = useState(false);

  // Animation effect to show messages one by one with delay
  useEffect(() => {
    if (messageIndex < initialMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, initialMessages[messageIndex]]);
        setMessageIndex(messageIndex + 1);
      }, 1000); // 1 second delay between messages
      
      return () => clearTimeout(timer);
    }
  }, [messageIndex]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const newMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setVisibleMessages(prev => [...prev, newMessage]);
    
    // Show modal after second message
    const userMessages = [...messages, newMessage].filter((msg) => msg.sender === "user")
    if (userMessages.length >= 2) {
      setShowSecondMessageModal(true);
      return;
    }
    
    // Simulate system response
    setTimeout(() => {
      const systemResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        text: `I can help with creating engaging captions! Let's work on making your posts stand out with compelling and creative captions.`,
        sender: 'system',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, systemResponse]);
      setVisibleMessages(prev => [...prev, systemResponse]);
    }, 1000);
  };

  const handleSignIn = () => {
    setShowSecondMessageModal(false);
    setView('signin');
  };

  const handleSignUp = () => {
    setShowSecondMessageModal(false);
    setView('signup');
  };

  return (
    <section className={`relative min-h-screen ${backgroundColor} overflow-hidden`} style={{ paddingTop: '80px' }}>
      {/* Cosmic Background with Multiple Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#1B2735] to-[#090A0F]"></div>
        
        {/* Static background gradients - no animation */}
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(33,78,194,0.05)] to-transparent"></div>
        
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-gradient-radial from-[rgba(156,39,176,0.05)] to-transparent"></div>
        
        {/* Static reduced star background */}
        <div className="absolute inset-0 bg-stars"></div>
        
        {/* Fixed stars with glow */}
        <div className="absolute top-[15%] left-[25%] w-0.5 h-0.5 rounded-full bg-white shadow-star"></div>
        <div className="absolute top-[65%] left-[75%] w-0.5 h-0.5 rounded-full bg-white shadow-star-lg"></div>
        <div className="absolute top-[35%] left-[85%] w-0.5 h-0.5 rounded-full bg-white shadow-star"></div>
        <div className="absolute top-[75%] left-[15%] w-0.5 h-0.5 rounded-full bg-white shadow-star"></div>
        
        {/* Fixed blue tinted stars */}
        <div className="absolute top-[45%] left-[60%] w-0.5 h-0.5 rounded-full bg-blue-300 shadow-star-blue"></div>
        <div className="absolute top-[25%] left-[40%] w-0.5 h-0.5 rounded-full bg-blue-300 shadow-star-blue"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-fadeIn">
            Interview <span className="text-blue-400">Mark</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-200 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {isAuth && user ? (
              <>Welcome back, {user.name}! Your 24/7 Social Media Expert</>
            ) : (
              <>Your 24/7 Social Media Expert</>
            )}
          </p>

          {/* Profile Image - Mark.png */}
          <div className="w-32 h-36 lg:w-40 lg:h-45 mx-auto mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <img 
              src={markImage} 
              alt="Mark the Social Media Expert" 
              className="w-full h-full object-contain" 
            />
          </div>
          
          {/* Chat Interface */}
          <div className="w-full max-w-lg mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <ChatInterface 
              messages={visibleMessages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
      
      {/* Add SecondMessageModal */}
      <SecondMessageModal 
        isOpen={showSecondMessageModal}
        onClose={() => setShowSecondMessageModal(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />

      {/* Global style for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out forwards;
            opacity: 0;
          }
          
          .bg-gradient-radial {
            background: radial-gradient(circle at 50% 50%, var(--tw-gradient-stops));
          }
          
          .bg-stars {
            background-image: 
              radial-gradient(1px 1px at 5% 15%, white, transparent),
              radial-gradient(1px 1px at 15% 10%, white, transparent),
              radial-gradient(1px 1px at 25% 12%, white, transparent),
              radial-gradient(1px 1px at 35% 22%, white, transparent),
              radial-gradient(1px 1px at 45% 30%, white, transparent),
              radial-gradient(1px 1px at 55% 42%, white, transparent),
              radial-gradient(1px 1px at 65% 25%, white, transparent),
              radial-gradient(1px 1px at 75% 5%, white, transparent),
              radial-gradient(1px 1px at 85% 70%, white, transparent),
              radial-gradient(1px 1px at 95% 80%, white, transparent);
          }
          
          .shadow-star {
            box-shadow: 0 0 10px 2px white;
          }
          
          .shadow-star-lg {
            box-shadow: 0 0 15px 3px white;
          }
          
          .shadow-star-blue {
            box-shadow: 0 0 8px 3px #a1c4fd;
          }
        `
      }} />
    </section>
  );
};

export default HomeHero; 