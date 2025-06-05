import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WaitlistFormData {
  name: string;
  email: string;
  businessType: string;
  businessWebsite: string;
}

const API_URL = 'https://5jsanjhv.rpcl.app/webhook/waitlist';

export function useWaitlist() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  // Submit only the email initially
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      setShowDialog(true);
      setIsSubmitting(false);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed to join waitlist');
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to join waitlist. Please try again.',
        duration: 5000,
      });
    } finally {
    }
  };

  // Submit the full form data
  const handleFormSubmit = async (formData: WaitlistFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('https://5jsanjhv.rpcl.app/webhook/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to complete registration');
      setIsSubmitted(true);
      setShowDialog(false);
      setEmail('');
      toast({
        title: "Congratulations! You're on the waitlist.",
        description: 'Check your email for future communications.',
        duration: 5000,
      });
      
      // Reset isSubmitted after toast duration
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to complete registration. Please try again.',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    isSubmitting,
    isSubmitted,
    showDialog,
    setShowDialog,
    handleEmailSubmit,
    handleFormSubmit
  };
}
