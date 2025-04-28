import React, { useState } from 'react';
import styles from "../styles/MainSection.module.css";
import ChatInterface, { MessageType } from '@/components/ChatInterface';

const MainSection: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
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
    },
  ]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const newMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate system response
    setTimeout(() => {
      const systemResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        text: `I can help with that! Let me provide some suggestions related to "${text}".`,
        sender: 'system',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, systemResponse]);
    }, 1000);
  };

  return (
    <div className={styles.MainSection_2_339}>
      <div className={styles.Heading_1_2_343}>
        <span className={styles.InterviewMark_2_344}>Interview Mark</span>
      </div>
      <span className={styles.Your_24_7SocialMediaExpert_2_348}>
        Your 24/7 Social Media Expert
      </span>
      <div className={styles.Mark_1_3_27}></div>
      <ChatInterface 
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default MainSection;