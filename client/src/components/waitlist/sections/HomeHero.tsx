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
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
      <div className="absolute inset-0 bg-grid-enhanced opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-fadeIn">
            Interview <span className="gradient-text-animated inline-block animate-neon-pulse">Mark</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {isAuth && user ? (
              <>Welcome back, <span className="gradient-text-neon font-semibold">{user.name}</span>! Your 24/7 Social Media Expert</>
            ) : (
              <>Your <span className="gradient-text-neon font-semibold">24/7</span> Social Media Expert</>
            )}
          </p>

          {/* Profile Image - Mark.png */}
          <div className="relative w-32 h-36 lg:w-40 lg:h-45 mx-auto mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            {/* Glowing aura behind mascot */}
            <div className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-10 animate-neon-pulse"></div>
            <img 
              src={markImage} 
              alt="Mark the Social Media Expert" 
              className="relative z-20 w-full h-full object-contain" 
            />
          </div>
          
          {/* Chat Interface */}
          <div className="w-full max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
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
        `
      }} />
    </section>
  );
};

export default HomeHero; 