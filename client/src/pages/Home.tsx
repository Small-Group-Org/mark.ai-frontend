import React, { useState, useEffect } from 'react';
import ChatInterface, { MessageType } from '@/components/ChatInterface';
import markImage from '../assets/mark.png';

export default function Home() {
  // Initial state with just the first three system messages (without user message)
  const initialMessages: MessageType[] = [
    {
      id: '1',
      text: '👋 Hi! I\'m Mark, your potential social media manager.',
      sender: 'system',
    },
    {
      id: '2',
      text: 'I\'d love to learn about your business and social media goals.',
      sender: 'system',
    },
    {
      id: '3',
      text: 'What\'s your biggest social media challenge right now?',
      sender: 'system',
    }
  ];

  // State to control animation of messages
  const [visibleMessages, setVisibleMessages] = useState<MessageType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [messageIndex, setMessageIndex] = useState(0);

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

  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      backgroundColor: "#0f172a", 
      color: "white",
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden' // Ensure no scrollbars from animation overflow
    }}>
      {/* Navbar */}
      <header style={{ 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Mark</span>
          <span style={{ color: '#60a5fa', marginLeft: '8px', fontSize: '18px' }}>- Social Growth Expert</span>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Features</a>
          <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>FAQ</a>
          <button style={{ 
            backgroundColor: '#1e293b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '9999px', 
            padding: '8px 20px',
            cursor: 'pointer'
          }}>Sign in</button>
          <button style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '9999px', 
            padding: '8px 20px',
            cursor: 'pointer'
          }}>Sign up</button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: '2rem', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <h1 style={{ 
          fontSize: '60px', 
          fontWeight: 'bold', 
          color: 'white',
          textAlign: 'center',
          margin: '0 0 0.5rem 0',
          animation: 'fadeIn 1s ease-in-out'
        }}>Interview <span style={{ color: '#60a5fa' }}>Mark</span></h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#93c5fd',
          textAlign: 'center',
          maxWidth: '592px',
          marginBottom: '2rem',
          animation: 'fadeIn 1.2s ease-in-out'
        }}>Your 24/7 Social Media Expert</p>

        {/* Profile Image - Mark.png with cosmic effect */}
        <div style={{ 
          width: '160px', 
          height: '180px', 
          marginBottom: '2rem',
          position: 'relative',
          animation: 'fadeIn 1.4s ease-in-out',
          filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.5))'
        }}>
          {/* Blue cosmic aura around Mark */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
            animation: 'pulse 3s infinite ease-in-out',
            zIndex: -1
          }}></div>
          
          {/* Mark image */}
          <img 
            src={markImage} 
            alt="Mark the Social Media Expert" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              animation: 'glow 3s infinite ease-in-out'
            }} 
          />
          
          {/* Small orbiting stars */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 10px #fff, 0 0 20px #fff',
            animation: 'orbit 8s linear infinite'
          }}></div>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '-15px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#60a5fa',
            boxShadow: '0 0 10px #60a5fa, 0 0 20px #60a5fa',
            animation: 'orbit 12s linear infinite 2s'
          }}></div>
        </div>
        
        {/* Chat Interface */}
        <div style={{ 
          width: '100%',
          maxWidth: '592px',
          animation: 'fadeIn 1.6s ease-in-out'
        }}>
          <ChatInterface 
            messages={visibleMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '25px 48px 24px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '1280px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#64748b', fontSize: '14px' }}>© 2025 Built by The Honeymooners Club</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
      
      {/* Cosmic Background with Multiple Layers */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        pointerEvents: 'none', 
        zIndex: 0,
        background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)'
      }}>
        {/* Nebula effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(33, 78, 194, 0.1) 0%, transparent 60%)',
          animation: 'nebula 30s infinite ease-in-out alternate'
        }}></div>
        
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle at 50% 50%, rgba(156, 39, 176, 0.1) 0%, transparent 70%)',
          animation: 'nebula2 40s infinite ease-in-out alternate'
        }}></div>
        
        {/* Small stars */}
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={`small-star-${i}`} style={{
            position: 'absolute',
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor: `rgba(${Math.random() * 70 + 185}, ${Math.random() * 70 + 185}, ${Math.random() * 70 + 185}, ${Math.random() * 0.5 + 0.5})`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 4 + 2}s infinite ease-in-out ${Math.random() * 3}s, float ${Math.random() * 80 + 40}s infinite ease-in-out ${Math.random() * 15}s`,
            boxShadow: '0 0 3px rgba(255, 255, 255, 0.4)'
          }} />
        ))}
        
        {/* Medium stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={`medium-star-${i}`} style={{
            position: 'absolute',
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            backgroundColor: `rgba(${Math.random() * 50 + 205}, ${Math.random() * 50 + 205}, ${Math.random() * 50 + 205}, 0.9)`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out ${Math.random() * 2}s, float ${Math.random() * 100 + 50}s infinite ease-in-out ${Math.random() * 20}s`,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.3)'
          }} />
        ))}
        
        {/* Large stars with glow */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={`large-star-${i}`} style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 3}px`,
            height: `${Math.random() * 4 + 3}px`,
            backgroundColor: `rgba(${Math.random() * 30 + 225}, ${Math.random() * 30 + 225}, ${Math.random() * 30 + 225}, 1)`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 7 + 4}s infinite ease-in-out ${Math.random() * 3}s, float ${Math.random() * 120 + 60}s infinite ease-in-out ${Math.random() * 30}s`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)'
          }} />
        ))}
        
        {/* Colored stars with different hues */}
        {Array.from({ length: 20 }).map((_, i) => {
          const hue = Math.floor(Math.random() * 360);
          return (
            <div key={`colored-star-${i}`} style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              backgroundColor: `hsla(${hue}, 100%, 70%, 0.9)`,
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 6 + 3}s infinite ease-in-out ${Math.random() * 2}s, float ${Math.random() * 90 + 40}s infinite ease-in-out ${Math.random() * 25}s`,
              boxShadow: `0 0 8px hsla(${hue}, 100%, 70%, 0.7), 0 0 16px hsla(${hue}, 100%, 70%, 0.4)`
            }} />
          );
        })}
      </div>
      
      {/* Global style for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes twinkle {
            0% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.5; transform: scale(1); }
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-10px) translateX(10px); }
            50% { transform: translateY(0) translateX(20px); }
            75% { transform: translateY(10px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
          
          @keyframes nebula {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(1); }
          }
          
          @keyframes nebula2 {
            0% { opacity: 0.2; transform: scale(1) rotate(0deg); }
            50% { opacity: 0.4; transform: scale(1.3) rotate(5deg); }
            100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes messageAppear {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.2); }
            50% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3); }
            100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.2); }
          }
          
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(70px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 0.6; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
          }
        `
      }} />
    </div>
  );
}
