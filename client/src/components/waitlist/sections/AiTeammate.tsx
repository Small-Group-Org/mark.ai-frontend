
import React, { useState, useEffect } from 'react';

const chatMessages = [
  { role: 'user', content: 'Hi Mark, could you plan our social media for next week?' },
  { role: 'assistant', content: 'Hey there! I\'ve analyzed your recent posts and engagement metrics. Here\'s a content plan for next week:', delay: 1000 },
  { role: 'assistant', content: '• Monday: Industry insight post (LinkedIn, Twitter)\n• Tuesday: Customer spotlight (Instagram, Facebook)\n• Thursday: Product update announcement\n• Friday: Weekly wrap-up newsletter', delay: 2000 },
  { role: 'user', content: 'That looks great! Can you also draft the Monday post?', delay: 3000 },
  { role: 'assistant', content: 'Absolutely! Here\'s a draft for Monday:', delay: 4000 },
  { role: 'assistant', content: '"Industry Insight: 5 emerging trends reshaping digital marketing in 2025. Our team\'s analysis shows that interactive content is driving 3x more engagement than static posts. What trends are you most excited about? #MarketingTrends #DigitalMarketing"', delay: 5000 },
  { role: 'assistant', content: 'Would you like me to schedule this post for Monday at 9am?', delay: 6000 },
];

const AiTeammate = () => {
  const [visibleMessages, setVisibleMessages] = useState<typeof chatMessages>([]);

  useEffect(() => {
    const showMessages = async () => {
      for (let i = 0; i < chatMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, chatMessages[i].delay || 1000));
        setVisibleMessages(prev => [...prev, chatMessages[i]]);
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && visibleMessages.length === 0) {
        showMessages();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3
    });
    
    const element = document.getElementById('ai-teammate-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [visibleMessages.length]);

  return (
    <section id="ai-teammate-section" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The ‘AI Employee’ Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Say goodbye to marketing chaos and hello to your new AI employee who works with you, not for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">From Chaos to Clarity</h3>
            <p className="text-gray-400 mb-6">
              Traditional marketing requires juggling multiple tools, calendars, and constant context switching. 
              Mark.AI centralizes your workflow through a simple chat interface.
            </p>
            
            <div className="space-y-4">
              {[
                "No more prompt engineering",
                "Contextual awareness of your brand",
                "Proactive suggestions and reminders",
                "Learns from your feedback"
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-purple-500/20 bg-purple-500/5"></div>
              <div className="glass rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl">
                <div className="bg-gray-900 p-4 flex items-center border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="mx-auto text-sm font-medium">Chat with Mark.AI</div>
                </div>
                <div className="p-4 h-80 overflow-y-auto scrollbar-hidden bg-gradient-to-b from-gray-900 to-black">
                  <div className="space-y-4">
                    {visibleMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-sm rounded-2xl p-3 text-sm ${
                          message.role === 'user' 
                            ? 'bg-purple-500/20 text-white rounded-tr-none' 
                            : 'bg-gray-700/40 text-gray-200 rounded-tl-none'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {visibleMessages.length < chatMessages.length && (
                      <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-sm rounded-2xl p-3 bg-gray-700/40">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-100"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-3 border-t border-white/10 bg-gray-900">
                  <div className="flex">
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border-0 rounded-l-lg p-2 text-sm focus:outline-none focus:ring-0"
                      placeholder="Message Mark.AI..."
                      disabled
                    />
                    <button className="bg-purple-600 text-white rounded-r-lg px-3 disabled:opacity-50" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 2-7 20-4-9-9-4Z"/>
                        <path d="M22 2 11 13"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTeammate;
