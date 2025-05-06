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
    
    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "You must agree to the Terms of Service and Privacy Policy.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(firstName, lastName, email, password);
      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
      });
      onClose(); // Close modal on successful registration
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cosmic theme colors with gradient background
  const primaryBg = 'bg-gradient-to-bl from-[#8E2DE2] to-[#4A00E0]'; // Dark purplish gradient
  const primaryText = 'text-white';
  const accentColor = 'bg-cyan-500';
  const accentHover = 'hover:bg-cyan-600';
  const accentText = 'text-cyan-500';
  const secondaryBg = 'bg-slate-800/40';
  const inputBg = 'bg-slate-800/40';
  const inputBorder = 'border-slate-600/50';
  const inputFocus = 'focus:border-cyan-500 focus:ring-cyan-500';
  const tabActive = 'bg-cyan-500 text-white';
  const tabInactive = 'bg-slate-700/70 text-gray-300';

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

        {/* Social login options will be implemented in the future */}
      </DialogContent>
    </Dialog>
  );
}