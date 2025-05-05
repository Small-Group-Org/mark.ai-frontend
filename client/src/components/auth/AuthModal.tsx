import React, { useState, FormEvent } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useAuthModal } from '@/hooks/use-auth-modal';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { view, setView } = useAuthModal();
  const { login, register } = useAuth();
  const { toast } = useToast();
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle login form submission
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have been logged in successfully!"
      });
      onClose(); // Close modal on successful login
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle registration form submission
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password || !firstName || !lastName || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      alert('You must agree to the terms of service');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(firstName, lastName, email, password);
      onClose(); // Close modal on successful registration
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cosmic theme colors
  const primaryBg = 'bg-indigo-900'; // Deep cosmic blue background
  const primaryText = 'text-white';
  const accentColor = 'bg-cyan-500';
  const accentHover = 'hover:bg-cyan-600';
  const accentText = 'text-cyan-500';
  const secondaryBg = 'bg-slate-800';
  const inputBg = 'bg-slate-700';
  const inputBorder = 'border-slate-600';
  const inputFocus = 'focus:border-cyan-500 focus:ring-cyan-500';
  const tabActive = 'bg-cyan-500 text-white';
  const tabInactive = 'bg-slate-700 text-gray-300';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
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
          <div className="absolute h-1 w-1 rounded-full bg-white top-[55%] left-[15%]"></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-white top-[65%] left-[35%]"></div>
          <div className="absolute h-1 w-1 rounded-full bg-white top-[75%] left-[65%]"></div>
          <div className="absolute h-2 w-2 rounded-full bg-white top-[85%] left-[75%]"></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-white top-[45%] left-[50%]"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center p-6 pb-2">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Interview</span>
            <span className="text-cyan-400">Mark</span>
          </h1>
        </div>

        {/* Tabs for Sign In / Sign Up */}
        <Tabs
          value={view}
          onValueChange={(v) => setView(v as 'signin' | 'signup')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mx-6 mb-6 rounded-lg overflow-hidden">
            <TabsTrigger 
              value="signin" 
              className={cn("py-3 rounded-none", view === 'signin' ? tabActive : tabInactive)}
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className={cn("py-3 rounded-none", view === 'signup' ? tabActive : tabInactive)}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="signin" className="px-6 pb-6 pt-2">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={cn(
                      inputBg,
                      inputBorder,
                      inputFocus,
                      "border text-white placeholder:text-gray-400"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                      Password
                    </Label>
                    <a href="#" className={cn(accentText, "text-xs hover:underline")}>
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={cn(
                      inputBg,
                      inputBorder,
                      inputFocus,
                      "border text-white placeholder:text-gray-400"
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-xs text-gray-300 font-medium leading-none"
                  >
                    Remember me
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={cn(accentColor, accentHover, "w-full text-white", 
                    isSubmitting && "opacity-70 cursor-not-allowed")}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-xs text-gray-400">
              <span>Don't have an account? </span>
              <button
                type="button"
                className={accentText + " hover:underline font-medium"}
                onClick={() => setView('signup')}
              >
                Sign up
              </button>
            </div>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup" className="px-6 pb-6 pt-2">
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-200">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className={cn(
                        inputBg,
                        inputBorder,
                        inputFocus,
                        "border text-white placeholder:text-gray-400"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-200">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className={cn(
                        inputBg,
                        inputBorder,
                        inputFocus,
                        "border text-white placeholder:text-gray-400"
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup" className="text-sm font-medium text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email-signup"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={cn(
                      inputBg,
                      inputBorder,
                      inputFocus,
                      "border text-white placeholder:text-gray-400"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup" className="text-sm font-medium text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password-signup"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={cn(
                      inputBg,
                      inputBorder,
                      inputFocus,
                      "border text-white placeholder:text-gray-400"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-200">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={cn(
                      inputBg,
                      inputBorder,
                      inputFocus,
                      "border text-white placeholder:text-gray-400"
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                    required
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs text-gray-300 font-medium leading-none"
                  >
                    I agree to the{" "}
                    <a href="#" className={cn(accentText, "hover:underline")}>
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className={cn(accentText, "hover:underline")}>
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={cn(accentColor, accentHover, "w-full text-white",
                    isSubmitting && "opacity-70 cursor-not-allowed")}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-xs text-gray-400">
              <span>Already have an account? </span>
              <button
                type="button"
                className={accentText + " hover:underline font-medium"}
                onClick={() => setView('signin')}
              >
                Sign in
              </button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Social login options */}
        <div className="px-6 pb-6">
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-3 text-gray-400 text-xs">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button 
              variant="outline" 
              className={cn(
                "border-gray-700 bg-slate-800 text-white hover:bg-slate-700",
                "flex items-center justify-center space-x-2"
              )}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              <span>Google</span>
            </Button>
            <Button 
              variant="outline" 
              className={cn(
                "border-gray-700 bg-slate-800 text-white hover:bg-slate-700",
                "flex items-center justify-center space-x-2"
              )}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span>Facebook</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}