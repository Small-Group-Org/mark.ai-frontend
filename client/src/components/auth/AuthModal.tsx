import React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { useAuth } from '@/hooks/useAuth';

export function AuthModal() {
  const { view, isOpen, setIsOpen, setView } = useAuthStore();
  const {
    isSubmitting,
    userCredential,
    userInputHandler,
    handleLoginSubmit,
    handleRegisterSubmit
  } = useAuth();

  const {email, password, agreeToTerms, confirmPassword, firstName, lastName, rememberMe} = userCredential;

  // Cosmic theme colors with gradient background
  const primaryBg = 'bg-gradient-to-bl from-slate-800 to-blue-950';
  const primaryText = 'text-white';
  const accentColor = 'bg-blue-600';
  const accentHover = 'hover:bg-blue-700';
  const accentText = 'text-blue-500';
  const secondaryBg = 'bg-slate-800/40';
  const inputBg = 'bg-slate-800/40';
  const inputBorder = 'border-slate-600/50';
  const inputFocus = 'focus:border-blue-500 focus:ring-blue-500';
  const tabActive = 'bg-blue-600 text-white border-b-2 border-blue-400';
  const tabInactive = 'bg-slate-800 text-gray-300 border-b-2 border-transparent';

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
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
            <span className="text-blue-400">Mark</span>
          </h1>
        </div>

        {/* Tabs for Sign In / Sign Up */}
        <Tabs
          value={view}
          onValueChange={(v) => setView(v as 'signin' | 'signup')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mx-6 mb-6 rounded-lg overflow-hidden ring-0 border border-slate-700 bg-slate-800 p-0">
            <TabsTrigger 
              value="signin" 
              className={cn("rounded-none h-full", view === 'signin' ? tabActive : tabInactive)}
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className={cn("rounded-none h-full", view === 'signup' ? tabActive : tabInactive)}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="signin" className="px-6 pb-6 pt-2">
            <form onSubmit={handleLoginSubmit}>
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
                    name='email'
                    onChange={userInputHandler}
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
                    name='password'
                    onChange={userInputHandler}
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
                    name='rememberMe'
                    onCheckedChange={(checked) => userInputHandler({target: {name: "rememberMe", checked: checked}})}
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
            <form onSubmit={handleRegisterSubmit}>
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
                      name='firstName'
                      onChange={userInputHandler}
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
                      name='lastName'
                      value={lastName}
                      onChange={userInputHandler}
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
                    name='email'
                    onChange={userInputHandler}
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
                    name='password'
                    onChange={userInputHandler}
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
                    name='confirmPassword'
                    onChange={userInputHandler}
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
                    name='agreeToTerms'                   
                    onCheckedChange={(checked) => userInputHandler({target: {name: "agreeToTerms", checked: checked}})}
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
                Sign In
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}