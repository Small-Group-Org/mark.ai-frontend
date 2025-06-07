import React from 'react';
import { InfoRow } from './InfoRow';

interface MainInfoProps {
  clientInfo: {
    company_name: string | null;
    industry: string | null;
    website: string | null;
    location: string | null;
  };
  newlyLearned?: Record<string, boolean>;
}

export const MainInfo: React.FC<MainInfoProps> = ({ clientInfo, newlyLearned = {} }) => (
  <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="md:w-48 flex justify-start md:justify-end order-first md:order-last">
        <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
          {clientInfo.company_name?.[0] || '?'}
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-white mb-2">{clientInfo.company_name || 'Company Name'}</h2>
        <div className="space-y-2">
          <InfoRow 
            label="Industry" 
            value={clientInfo.industry} 
            isNew={newlyLearned['client_info.industry']}
          />
          <InfoRow 
            label="Location" 
            value={clientInfo.location} 
            isNew={newlyLearned['client_info.location']}
          />
          <InfoRow 
            label="Website" 
            value={clientInfo.website} 
            isNew={newlyLearned['client_info.website']}
          />
        </div>
      </div>
    </div>
  </div>
); 