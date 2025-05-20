import React from 'react';

interface LeftPanelProps {
  className?: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ className = '' }) => {
  return (
    <div className={`h-full bg-[#4673A1] w-[727px] ${className}`}>
      <div className="p-6">
        {/* Chat or content area here */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {/* Messages would go here */}
            <div className="space-y-4 pb-4">
              {/* Example message threads would be rendered here */}
              <div className="bg-[rgba(255,255,255,0.1)] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Project Discussion</h3>
                <p className="text-white/80 text-sm">Let's discuss the upcoming project timeline and milestones.</p>
              </div>
              
              <div className="bg-[rgba(255,255,255,0.1)] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Weekly Update</h3>
                <p className="text-white/80 text-sm">Here's a summary of what we've accomplished this week.</p>
              </div>
            </div>
          </div>
          
          {/* Input area */}
          <div className="mt-auto pt-4">
            <div className="bg-[rgba(32,41,53,0.5)] border border-[rgba(71,85,105,0.5)] rounded-xl p-4">
              <div className="flex items-center">
                <input 
                  type="text" 
                  placeholder="Type your message here..." 
                  className="flex-1 bg-transparent text-white outline-none"
                />
                <button className="ml-2 text-white rounded-full p-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;