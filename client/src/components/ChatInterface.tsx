import React, { useEffect, useRef, useState } from 'react';

export type MessageType = {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp?: Date;
};

export type ChatInterfaceProps = {
  messages: MessageType[];
  onSendMessage: (message: string) => void;
  features?: string[];
  className?: string;
  placeholderText?: string;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  features = [
    'Create engaging content',
    'Schedule posts',
    '24/7 engagement',
    'Track performance'
  ],
  className = '',
  placeholderText = 'Type your message...'
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

useEffect(() => {
  const scrollTimeout = setTimeout(() => {
      if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
              top: chatContainerRef.current.scrollHeight,
              behavior: 'smooth'
          });
      }
  }, 0);
  
  return () => clearTimeout(scrollTimeout);
}, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div 
      className={className}
      style={{ 
        width: '100%',
        maxWidth: '720px',
        border: '1px solid rgba(51, 65, 85, 0.5)',
        background: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(6px)',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}
    >
      {/* Chat Header with Features */}
      <div style={{ 
        borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
        padding: '10px'
      }}>
        {/* Features in a grid layout */}
        <div className="features-container" style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: '8px'
        }}>
          {features.map((feature, index) => (
            <div key={index} className="feature-item" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: 'flex-start'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.66667 1.33337L2 9.33337H8L7.33333 14.6667L14 6.66671L8 6.66671L8.66667 1.33337Z" 
                  stroke="#60A5FA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        style={{ 
          padding: '16px', 
          maxHeight: '250px', 
          minHeight: '250px',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
      }}>
        {messages.map((message) => (
          <div 
            key={message.id}
            style={{ 
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
              width: '100%'
            }}
          >
            <div style={{ 
              background: message.sender === 'user' 
                ? 'white' 
                : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: message.sender === 'user'
                ? '16px 16px 0 16px'
                : '16px 16px 16px 0',
              padding: '8px 16px',
              color: message.sender === 'user' ? '#334155' : 'white',
              maxWidth: '80%',
              fontSize: '14px',
              lineHeight: '1.4',
              boxShadow: message.sender === 'user'
                ? 'none'
                : '0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -4px rgba(59, 130, 246, 0.2)',
              animation: 'messageAppear 0.5s ease-out',
              textAlign: message.sender === 'user' ? 'right' : 'left'
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Chat Input */}
      <form 
        onSubmit={handleSubmit}
        style={{ 
          padding: '13px 16px',
          borderTop: '1px solid rgba(51, 65, 85, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholderText}
          style={{
            flex: 1,
            border: '1px solid rgba(71, 85, 105, 0.5)',
            background: 'rgba(51, 65, 85, 0.5)',
            borderRadius: '9999px',
            padding: '12px 17px',
            color: 'white',
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            borderRadius: '9999px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6666 1.33337L9.99998 14.6667L7.33331 8.66671L1.33331 6.00004L14.6666 1.33337Z" 
              stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.6666 1.33337L7.33331 8.66671" 
              stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;