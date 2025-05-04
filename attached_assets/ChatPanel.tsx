"use client";

import React, { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import {
    PaperclipIcon,
    SendIcon
} from './IconComponents';

// Define message structure
interface Message {
    id: number; // Simple ID for key prop
    text: string;
    sender: 'user' | 'ai';
}

const ChatPanel = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        // Initial messages from the design
        { id: 1, text: "👋 Hi! I'm Mark, your potential social media manager.", sender: 'ai' },
        { id: 2, text: "I'd love to learn about your business and social media goals.", sender: 'ai' },
        { id: 3, text: "What's your biggest social media challenge right now?", sender: 'ai' },
        { id: 4, text: "I need help in captions", sender: 'user' },
        { id: 5, text: "Let's start creating your post 🚀✨", sender: 'ai' },
    ]);
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling

    const chatPanelBg = 'bg-[#11132f]';
    const chatHeaderBorder = 'border-gray-600/60';
    const chatInputBorder = 'border-[#475569]/50';
    const chatInputBg = 'bg-[#334155]/50';
    const messagePlaceholderColor = 'text-gray-400';
    const sendButtonBg = 'bg-blue-600'; // bg-[#2563eb]
    const chatBubbleGradient = 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb]';
    const userChatBubbleBg = 'bg-white';
    const userChatBubbleText = 'text-gray-700'; // text-[#334155]

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleSend = () => {
        const messageText = inputValue.trim();
        if (messageText) {
            const newMessage: Message = {
                id: Date.now(), // Use timestamp for unique ID (simple approach)
                text: messageText,
                sender: 'user'
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputValue('');

            const textarea = document.getElementById('chat-textarea') as HTMLTextAreaElement;
            if (textarea) {
                textarea.style.height = 'auto';
            }

            // TODO: Add logic here to potentially trigger an AI response
            // For example, using setTimeout to simulate a delay:
            // setTimeout(() => {
            //     const aiResponse: Message = {
            //         id: Date.now() + 1,
            //         text: "Okay, working on captions for you...",
            //         sender: 'ai'
            //     };
            //     setMessages(prev => [...prev, aiResponse]);
            // }, 1000);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`relative flex flex-col ${chatPanelBg} text-white border-r-2 border-gray-800 h-full`}> {/* Ensure full height */} 
            {/* Chat Header */}
            <div className={`h-[54px] flex items-center px-5 border-b ${chatHeaderBorder} shrink-0`}>
                <h2 className="font-semibold text-sm">Chat with Mark</h2>
            </div>

            {/* Chat Messages Area */}
            {/* Added flex-grow and overflow-y-auto for scrolling */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-2 rounded-lg max-w-[85%] md:max-w-[80%] shadow-md text-sm ${message.sender === 'user'
                            ? `${userChatBubbleBg} ${userChatBubbleText}`
                            : `${chatBubbleGradient} text-white`
                            }`}>
                            {/* Basic rendering of text, consider markdown support later */}
                            {message.text.split('\n').map((line, index) => (
                                <React.Fragment key={index}>{line}<br /></React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input Area */}
            {/* Ensure input stays at the bottom */}
            <div className={`p-4 border-t ${chatInputBorder} shrink-0`}>
                <div className={`flex items-end ${chatInputBg} rounded-xl border ${chatInputBorder} px-4 py-2`}> {/* Use items-end */} 
                    <textarea
                        id="chat-textarea"
                        rows={1}
                        placeholder="Type your message..."
                        className={`flex-1 bg-transparent ${messagePlaceholderColor} text-sm focus:outline-none resize-none py-1.5 placeholder-gray-400 max-h-24 overflow-y-auto`}
                        style={{ scrollbarWidth: 'none' }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    {/* Attachment button removed based on screenshot */}
                    {/* <button className="ml-2 text-gray-400 hover:text-white self-center"> */}
                    {/*     <PaperclipIcon /> */} 
                    {/* </button> */}
                    <button
                        className={`ml-3 ${sendButtonBg} rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-blue-700 flex-shrink-0 self-center mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel; 