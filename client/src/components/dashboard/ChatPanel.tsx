import React, { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios
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
    const [messages, setMessages] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState(false); // Add isThinking state
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

    // Initialize chat with first AI message
    useEffect(() => {
        // Set thinking state when component mounts
        setIsThinking(true);

        // Make API call to get initial greeting
        axios.post(
            'https://5jsanjhv.rpcl.app/webhook/fcc407ed-9e48-44d0-a1cd-81773a0f4073',
            {
                inputText: "Hi There!",
                sessionID: "u1234s21"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(response => {
            setIsThinking(false);
            const data = response.data;
            
            if (data && data.output) {
                const aiResponse: Message = {
                    id: Date.now(),
                    text: data.output,
                    sender: 'ai'
                };
                setMessages([aiResponse]); // Set as first message
            }
        })
        .catch(error => {
            setIsThinking(false);
            console.error('Initial API call error:', error);
            
            // Handle error case
            const errorMessage = 'Sorry, I couldn\'t connect. Please try again later.';
            const aiErrorResponse: Message = {
                id: Date.now(),
                text: errorMessage,
                sender: 'ai'
            };
            setMessages([aiErrorResponse]);
        });
    }, []); // Empty dependency array ensures this only runs once on mount

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

    const handleSend = async () => { // Make the function async
        const messageText = inputValue.trim();
        if (messageText) {
            const newMessage: Message = {
                id: Date.now(), // Use timestamp for unique ID (simple approach)
                text: messageText,
                sender: 'user'
            };
            // Add user message immediately
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputValue(''); // Clear input after sending user message

            const textarea = document.getElementById('chat-textarea') as HTMLTextAreaElement;
            if (textarea) {
                textarea.style.height = 'auto'; // Reset textarea height
            }

            // Set thinking flag to true
            setIsThinking(true);

            // --- API Call Logic using axios ---
            try {
                const response = await axios.post(
                    'https://5jsanjhv.rpcl.app/webhook/fcc407ed-9e48-44d0-a1cd-81773a0f4073',
                    {
                        inputText: messageText,
                        sessionID: "u1234s21" // Hardcoded session ID for now
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );

                setIsThinking(false); // Reset thinking state
                const data = response.data; // axios automatically parses JSON

                if (data && data.output) {
                    const aiResponse: Message = {
                        id: Date.now() + 1, // Ensure unique ID
                        text: data.output,
                        sender: 'ai'
                    };
                    setMessages(prev => [...prev, aiResponse]);
                } else {
                    console.error('API Error: Invalid response format', data);
                    const aiErrorResponse: Message = {
                        id: Date.now() + 1,
                        text: 'Error: Received invalid response format from AI.',
                        sender: 'ai'
                    };
                    setMessages(prev => [...prev, aiErrorResponse]);
                }

            } catch (error) {
                setIsThinking(false); // Reset thinking state on error
                console.error('Axios Error:', error);
                let errorMessage = 'Error: Could not connect to the AI service.';
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.error('API Error Data:', error.response.data);
                        console.error('API Error Status:', error.response.status);
                        errorMessage = `Error: Could not get response (${error.response.status})`;
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error('API No Response Request:', error.request);
                        errorMessage = 'Error: No response received from AI service.';
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.error('Axios Setup Error:', error.message);
                        errorMessage = `Error: ${error.message}`;
                    }
                } else {
                    // Handle non-Axios errors
                    console.error('Non-Axios Error:', error);
                }

                const aiErrorResponse: Message = {
                    id: Date.now() + 1,
                    text: errorMessage,
                    sender: 'ai'
                };
                setMessages(prev => [...prev, aiErrorResponse]);
            }
            // --- End API Call Logic ---
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`relative flex flex-col ${chatPanelBg} text-white border-r-2 border-gray-800 h-full overflow-hidden`}> {/* Added overflow-hidden */} 
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
                                <span key={index}>{line}<br /></span>
                            ))}
                        </div>
                    </div>
                ))}
                
                {/* Thinking indicator */}
                {isThinking && (
                    <div className="flex justify-start">
                        <div className={`px-4 py-2 rounded-lg max-w-[85%] md:max-w-[80%] shadow-md text-sm ${chatBubbleGradient} text-white`}>
                            Thinking...
                        </div>
                    </div>
                )}
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