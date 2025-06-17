import React from 'react';
import { InfoRow } from './InfoRow';
import { WebsiteScraping } from '@/types';

interface MainInfoProps {
  clientInfo: {
    company_name: string | null;
    industry: string | null;
    website: string | null;
    location: string | null;
  };
  websiteScraping: WebsiteScraping;
  newlyLearned?: Record<string, boolean>;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-400';
    case 'in_progress': return 'text-yellow-400';
    case 'failed': return 'text-red-400';
    case 'pending': return 'text-gray-400';
    default: return 'text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return '✅';
    case 'in_progress': return '🔄';
    case 'failed': return '❌';
    case 'pending': return '⏳';
    default: return '❓';
  }
};

export const MainInfo: React.FC<MainInfoProps> = ({ clientInfo, websiteScraping, newlyLearned = {} }) => (
  <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
    <div className="flex flex-col md:flex-row md:items-start gap-6">
      <div className="md:w-48 flex justify-start md:justify-end order-first md:order-last">
        <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
          {clientInfo.company_name?.[0] || '?'}
        </div>
      </div>
      <div className="flex-1 space-y-6">
        {/* Company Information */}
        <div>
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

        {/* Website Scraping Information */}
        <div className="border-t border-slate-700 pt-4">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            🌐 Website Analysis
          </h3>
          <div className="space-y-2">
            <InfoRow 
              label="Scraping Status" 
              value={
                <span className={`flex items-center gap-2 ${getStatusColor(websiteScraping.scraping_status)}`}>
                  {getStatusIcon(websiteScraping.scraping_status)}
                  {websiteScraping.scraping_status.replace('_', ' ').toUpperCase()}
                </span>
              }
            />
            <InfoRow 
              label="Attempts" 
              value={websiteScraping.scraping_attempts}
            />
            {websiteScraping.last_scraped && (
              <InfoRow 
                label="Last Scraped" 
                value={new Date(websiteScraping.last_scraped).toLocaleDateString()}
              />
            )}
            {websiteScraping.content_summary && (
              <InfoRow 
                label="Content Summary" 
                value={
                  <div className="max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 p-2 bg-slate-900 rounded border border-slate-700">
                    {websiteScraping.content_summary}
                  </div>
                }
              />
            )}
            {websiteScraping.error_message && (
              <InfoRow 
                label="Error" 
                value={<span className="text-red-400">{websiteScraping.error_message}</span>}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
); 