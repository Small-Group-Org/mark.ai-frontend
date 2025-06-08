import React, { ChangeEvent, KeyboardEvent, useRef, useEffect } from "react";
import { SendIcon } from "./IconComponents";
import { ThreeDots } from "react-loader-spinner";
import { usePostStore } from "@/store/usePostStore";
import { Message } from "@/types";
import { chatWithMark } from "@/services/chatServices";
import { useAuthStore } from "@/store/useAuthStore";
import { marked } from 'marked';
import { initialiseChatWithMark } from "@/commons/constant";
import { formatHashtagsForDisplay } from "@/utils/postUtils";
import { 
  extractPostDetailsFromMessage, 
  cleanMessageText, 
  setCalendarNavigationState 
} from "@/utils/infoMessageUtils";
import { useLocation } from 'wouter';
import { Info } from "lucide-react";

// TESTING IMPORT - REMOVE BEFORE PRODUCTION
import { exposeTestingFunctions, cleanupTestingFunctions } from "@/utils/testingUtils";

const ChatPanel = () => {
  const {
    messages,
    isThinking,
    setIsThinking,
    setLivePost,
    setMessages,
    livePost,
    loadChatHistory,
    addInfoMessage,
  } = usePostStore();
  
  const [inputValue, setInputValue] = React.useState("");
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isAuth, isMobileView, isOnboardingComplete, fetchOnboardingState } = useAuthStore();
  const [, navigate] = useLocation();

  // Theme constants
  const chatPanelBg = "bg-[#11132f]";
  const chatHeaderBorder = "border-gray-600/60";
  const chatInputBorder = "border-[#475569]/50";
  const chatInputBg = "bg-[#334155]/50";
  const messagePlaceholderColor = "text-gray-400";
  const sendButtonBg = "bg-blue-600";
  const chatBubbleGradient = "bg-gradient-to-r from-[#3b82f6] to-[#2563eb]";
  const userChatBubbleBg = "bg-white";
  const userChatBubbleText = "text-gray-700";

  // Load chat history on component mount
  useEffect(() => {
    const loadHistory = async () => {
      if (isAuth) {
        try {
          await loadChatHistory();
        } catch (error) {
          console.error('Failed to load chat history:', error);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };

    loadHistory();
  }, [isAuth, loadChatHistory]);

  // Initialize chat with Mark
  useEffect(() => {
    if (!isAuth || isLoadingHistory) return;

    if (isOnboardingComplete()) {
      handleChatResponse(initialiseChatWithMark);
      return;
    }

    if (!isOnboardingComplete() && messages?.length === 0) {
      handleChatResponse(initialiseChatWithMark);
    }
  }, [isAuth, isLoadingHistory]);

  // Auto-scroll to bottom
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
  }, [messages, isThinking]);

  // Auto-focus textarea
  useEffect(() => {
    if (!isThinking && textareaRef.current) {
      const focusTimeout = setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(focusTimeout);
    }
  }, [isThinking]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isThinking) {
      setInputValue(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleChatResponse = async (messageText: string) => {
    try {
      setIsThinking(true);
      const requestBody = {
        message: messageText,
        post: {
          ...livePost,
          scheduleDate: livePost.scheduleDate.toISOString()
        }
      };

      const response = await chatWithMark(requestBody);
      
      if (response?.bot?.text) {
        const postDetails = extractPostDetailsFromMessage(response.bot.text);
        const cleanText = cleanMessageText(response.bot.text);
        
        if (postDetails && postDetails.action) {
          addInfoMessage(cleanText, postDetails.action, postDetails.postId, postDetails.scheduleDate);
        } else {
          const aiResponseMessage: Message = {
            id: Date.now().toString(),
            text: response.bot.text,
            sender: "system",
            timestamp: new Date()
          };
          setMessages((prevMessages: Message[]) => [...prevMessages, aiResponseMessage]);
        }

        if (response.hasPost) {
          const { post } = response;
          const rawHashtags = Array.isArray(post.hashtag) ? post.hashtag.join(' ') : (post.hashtag ?? "");
          const formattedHashtags = formatHashtagsForDisplay(rawHashtags);
          
          setLivePost({
            title: post.title ?? "",
            content: post.content ?? "",
            hashtag: formattedHashtags
          });

          if (!isOnboardingComplete()) {
            await fetchOnboardingState();
            setTimeout(() => {
              addInfoMessage(
                "Hey! I'm creating your post, checkout the preview here",
                "navigate-create"
              );
            }, 1000);
          }
        } else {
          await fetchOnboardingState();
        }
      } else {
        const aiErrorResponse: Message = {
          id: Date.now().toString(),
          text: "I am sorry, looks like I am not able to process any request. Can you please try again?",
          sender: "system",
          timestamp: new Date()
        };
        setMessages((prev: Message[]) => [...prev, aiErrorResponse]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error: Could not connect to the AI service.";
      const aiErrorResponse: Message = {
        id: Date.now().toString(),
        text: errorMessage,
        sender: "system",
        timestamp: new Date()
      };
      setMessages((prev: Message[]) => [...prev, aiErrorResponse]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = async () => {
    const messageText = inputValue.trim();
    if (messageText && !isThinking) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: "user",
        timestamp: new Date()
      };
      setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
      setInputValue("");

      const textarea = document.getElementById("chat-textarea") as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = "auto";
      }

      await handleChatResponse(messageText);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isThinking) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (text: string) => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const processedText = text.replace(/\n/g, '<br>');
    const htmlContent = marked(processedText);

    return (
      <div 
        className="max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  // Navigation handler for info messages
  const handleInfoNavigation = (action: string, postId?: string, scheduleDate?: string) => {
    if (action === "navigate-create") {
      navigate("/create");
    } else if (action === "navigate-calendar" && postId) {
      setCalendarNavigationState(postId, scheduleDate || "");
      navigate("/calendar");
    }
  };

  // Production function for creating info messages
  const createPostScheduledInfoMessage = (postId: string, scheduleDate: string, action: "schedule" | "draft") => {
    const actionText = action === "schedule" ? "scheduled" : "drafted";
    addInfoMessage(
      `Hey! I have ${actionText} your post, you can edit it here`,
      "navigate-calendar",
      postId,
      scheduleDate
    );
  };

  /* ========================================
   * TESTING CODE - REMOVE BEFORE PRODUCTION
   * ======================================== */
  
  // Expose testing functions globally (TESTING ONLY - REMOVE IN PRODUCTION)
  React.useEffect(() => {
    exposeTestingFunctions();
    return cleanupTestingFunctions;
  }, []);

  /* ========================================
   * END OF TESTING CODE
   * ======================================== */

  return (
    <div
      className={`relative flex flex-col ${chatPanelBg} text-white border-r-2 border-gray-800 h-full overflow-hidden ${isMobileView ? '' : ''}`}
    >
      <div
        className={`h-[54px] flex items-center justify-between px-5 border-b ${chatHeaderBorder} shrink-0`}
      >
        <h2 className="font-semibold text-sm">Chat with Mark</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">Online</span>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
      >
        {isLoadingHistory ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center space-y-2">
              <ThreeDots
                visible={true}
                height="30"
                width="60"
                color="#3b82f6"
                radius="9"
                ariaLabel="loading-chat-history"
                wrapperStyle={{}}
                wrapperClass=""
              />
              <span className="text-gray-400 text-sm">Loading chat history...</span>
            </div>
          </div>
        ) : (
          <>
            {(messages || []).map((message) => (
              <div key={message.id}>
                {message.type === "info" ? (
                  <InfoMessage 
                    message={message} 
                    onNavigate={handleInfoNavigation}
                  />
                ) : (
                  <div
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[85%] md:max-w-[80%] shadow-md text-sm ${
                        message.sender === "user"
                          ? `${userChatBubbleBg} ${userChatBubbleText}`
                          : `${chatBubbleGradient} text-white`
                      }`}
                    >
                      {renderMessageContent(message.text)}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div
                  className={`px-4 py-2 rounded-lg max-w-[85%] md:max-w-[80%] shadow-md text-sm ${chatBubbleGradient} text-white`}
                >
                  <ThreeDots
                    visible={true}
                    height="20"
                    width="40"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className={`p-4 border-t ${chatInputBorder} shrink-0`}>
        <div
          className={`flex items-end ${chatInputBg} rounded-xl border ${chatInputBorder} px-4 py-2`}
        >
          <textarea
            id="chat-textarea"
            rows={1}
            placeholder={isThinking ? "Mark is thinking..." : "Type your message..."}
            className={`flex-1 bg-transparent ${messagePlaceholderColor} text-sm focus:outline-none resize-none py-1.5 placeholder-gray-400 max-h-24 overflow-y-auto`}
            style={{ scrollbarWidth: "none" }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            ref={textareaRef}
          />
          <button
            className={`ml-3 ${sendButtonBg} rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-blue-700 flex-shrink-0 self-center mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleSend}
            disabled={!inputValue.trim() || isThinking}
          >
            <SendIcon className="w-5 h-5 transform rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

// InfoMessage Component
interface InfoMessageProps {
  message: Message;
  onNavigate: (action: string, postId?: string, scheduleDate?: string) => void;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message, onNavigate }) => {
  const handleClick = () => {
    if (message.postDetails?.action) {
      onNavigate(
        message.postDetails.action,
        message.postDetails.postId,
        message.postDetails.scheduleDate
      );
    }
  };

  const renderMessageWithLink = (text: string) => {
    const parts = text.split('here');
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <button
            onClick={handleClick}
            className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer bg-transparent border-none p-0 inline"
          >
            here
          </button>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 rounded-lg max-w-[85%] md:max-w-[80%] shadow-md text-sm bg-blue-50 border border-blue-200 text-blue-800">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p>{renderMessageWithLink(message.text)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;