import React, { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import {
    PaperclipIcon,
    SendIcon
} from './IconComponents';

// Define message structure
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

const ChatPanel = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        // Initial messages
        { id: 1, text: "👋 Hi! I'm Mark, your potential social media manager.", sender: 'ai' },
        { id: 2, text: "I'd love to learn about your business and social media goals.", sender: 'ai' },
        { id: 3, text: "What's your biggest social media challenge right now?", sender: 'ai' },
        { id: 4, text: "I need help in captions", sender: 'user' },
        { id: 5, text: "Let's start creating your post 🚀✨", sender: 'ai' },
    ]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const chatPanelBg = 'bg-[#11132f]';
    const chatHeaderBorder = 'border-gray-600/60';
    const chatInputBorder = 'border-[#475569]/50';
    const chatInputBg = 'bg-[#334155]/50';
    const messagePlaceholderColor = 'text-gray-400';
    const sendButtonBg = 'bg-blue-600';
    const chatBubbleGradient = 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb]';
    const userChatBubbleBg = 'bg-white';
    const userChatBubbleText = 'text-gray-700';

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        // Auto-resize textarea
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleSend = () => {
        const messageText = inputValue.trim();
        if (messageText) {
            const newMessage: Message = {
                id: Date.now(),
                text: messageText,
                sender: 'user'
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputValue('');

            // Reset textarea height
            const textarea = document.getElementById('chat-textarea') as HTMLTextAreaElement;
            if (textarea) {
                textarea.style.height = 'auto';
            }

            // Simulate AI response after a delay
            setTimeout(() => {
                const aiResponse: Message = {
                    id: Date.now() + 1,
                    text: "I'll help you craft the perfect caption for your post. Could you tell me more about the content or theme of your post?",
                    sender: 'ai'
                };
                setMessages(prev => [...prev, aiResponse]);
            }, 1000);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`relative flex flex-col ${chatPanelBg} text-white border-r-2 border-gray-800 h-full`}>
            {/* Chat Header */}
            <div className={`h-[54px] flex items-center px-5 border-b ${chatHeaderBorder} shrink-0`}>
                <h2 className="font-semibold text-sm">Chat with Mark</h2>
            </div>

            {/* Chat Messages Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-2 rounded-lg max-w-[85%] md:max-w-[80%] shadow-md text-sm ${
                            message.sender === 'user'
                                ? `${userChatBubbleBg} ${userChatBubbleText}`
                                : `${chatBubbleGradient} text-white`
                            }`}>
                            {/* Render text with line breaks */}
                            {message.text.split('\n').map((line, index) => (
                                <React.Fragment key={index}>{line}<br /></React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input Area */}
            <div className={`p-4 border-t ${chatInputBorder} shrink-0`}>
                <div className={`flex items-end ${chatInputBg} rounded-xl border ${chatInputBorder} px-4 py-2`}>
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