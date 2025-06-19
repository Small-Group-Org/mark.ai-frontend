import React from 'react';
import markAiLogo from '../../../../public/images/logos/mark-logo-light-grad.png';
import { SOCIAL_MEDIA, COMPANY_INFO } from '@/constants/company';

interface FooterProps {
  backgroundColor?: string;
}

// Social media icons object
const socialMediaIcons = {
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  tiktok: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
};

// Platform-specific hover colors
const platformHoverColors = {
  instagram: 'hover:text-pink-500', // Instagram pink/magenta
  linkedin: 'hover:text-blue-600',  // LinkedIn blue
  facebook: 'hover:text-blue-500',  // Facebook blue
  twitter: 'hover:text-sky-400',    // Twitter/X light blue
  tiktok: 'hover:text-red-500'      // TikTok red/pink
};

const Footer: React.FC<FooterProps> = ({ backgroundColor = '' }) => {
  return (
    <footer className={`py-12 ${backgroundColor} border-t border-gray-800`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src={markAiLogo} alt="Mark.AI" className="h-12" />
            <p className="mt-2 text-gray-400 text-sm mb-1">
              Built by The Honeymooners Club
            </p>
            <div className="text-gray-400 text-sm">
              <div className="flex items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-gray-300 transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              {Object.entries(SOCIAL_MEDIA).map(([key, social]) => (
                <a 
                  key={key}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${platformHoverColors[key as keyof typeof platformHoverColors]} transition-colors`}
                  aria-label={social.platform}
                >
                  {socialMediaIcons[key as keyof typeof socialMediaIcons]}
                </a>
              ))}
            </div>
            
            <div className="text-gray-400 text-sm mb-3">
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-gray-300 mr-4">Contact Us</a>
              <a href="/privacy-policy" className="hover:text-gray-300 mr-4">Privacy Policy</a>
              <a href="/terms-conditions" className="hover:text-gray-300">Terms & Conditions</a>
            </div>
            
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p className="mb-2">Mark.ai – Built by The Honeymooners Club</p>
          <p>© {new Date().getFullYear()} Mark.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
