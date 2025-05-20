import React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import mark from '../assets/mark.png';

interface SecondMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

export function SecondMessageModal({ isOpen, onClose, onSignIn, onSignUp }: SecondMessageModalProps) {
  // Cosmic theme colors with gradient background
  const primaryBg = 'bg-gradient-to-bl from-slate-800 to-blue-950';
  const primaryText = 'text-white';
  const accentColor = 'bg-blue-600';
  const accentHover = 'hover:bg-blue-700';
  const accentText = 'text-blue-500';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/10 backdrop-blur-sm" />
      <DialogContent className={cn(
        primaryBg,
        primaryText,
        "sm:max-w-md rounded-xl p-0 border-0 shadow-2xl overflow-hidden"
      )}>
        {/* Starry background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute h-2 w-2 rounded-full bg-white top-[10%] left-[25%]"></div>
          <div className="absolute h-1 w-1 rounded-full bg-white top-[20%] left-[15%]"></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-white top-[30%] left-[35%]"></div>
          <div className="absolute h-1 w-1 rounded-full bg-white top-[25%] left-[65%]"></div>
          <div className="absolute h-2 w-2 rounded-full bg-white top-[15%] left-[75%]"></div>
        </div>

        {/* Header */}
        <div className="p-6 pb-2">
          <h1 className="text-3xl font-bold">
          <img
                src={mark}
                alt="Mark.ai Logo"
                style={{ height: '65px', objectFit: 'contain' }}
            />
            <span className="text-white">Sign in to continue</span>
          </h1>
          <p className="text-gray-300 mt-4  text-sm">
              To continue chatting with Mark and access all features, please sign in to your account.
            </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-2">
            <div className="flex flex-col gap-3 mt-4">
              <Button 
                onClick={onSignIn}
                className={cn(accentColor, accentHover, "w-full text-white")}
              >
                Sign In
              </Button>
              <Button 
                onClick={onSignUp}
                variant="outline"
                className="w-full border-gray-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                Sign Up
              </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 