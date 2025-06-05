import React, { useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check } from 'lucide-react';

interface WaitlistFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WaitlistFormData) => void;
  initialEmail: string;
  isSubmitting: boolean;
}

interface WaitlistFormData {
  name: string;
  email: string;
  businessType: string;
  businessWebsite: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  businessType: z.string().min(1, { message: "Please select a business type." }),
  businessWebsite: z.string().optional(),
});

const WaitlistForm = ({ open, onOpenChange, onSubmit, initialEmail, isSubmitting }: WaitlistFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: initialEmail,
      businessType: "",
      businessWebsite: ""
    }
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset({
        name: "",
        email: "",
        businessType: "",
        businessWebsite: ""
      });
    }
  }, [open, form]);

  // Update email field when initialEmail changes
  useEffect(() => {
    form.setValue('email', initialEmail);
  }, [initialEmail, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Ensure all required fields are properly typed for WaitlistFormData
    const formData: WaitlistFormData = {
      name: values.name,
      email: values.email,
      businessType: values.businessType,
      businessWebsite: values.businessWebsite || "" // Ensure empty string if not provided
    };
    
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-50 border-gray-200 text-gray-900 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Complete Your Waitlist Registration</DialogTitle>
          <DialogDescription className="text-gray-600">
            Tell us a bit more about yourself so we can tailor Mark.AI to your needs.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your email" 
                      className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Business Type</FormLabel>
                  <FormControl>
                    <select 
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-base text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors"
                      {...field}
                    >
                      <option value="" className="bg-white text-gray-500">Select business type</option>
                      <option value="solopreneur" className="bg-white text-gray-900">Solopreneur</option>
                      <option value="startup" className="bg-white text-gray-900">Startup (2-10 employees)</option>
                      <option value="small_business" className="bg-white text-gray-900">Small Business (11-50 employees)</option>
                      <option value="medium_business" className="bg-white text-gray-900">Medium Business (51-200 employees)</option>
                      <option value="enterprise" className="bg-white text-gray-900">Enterprise (201+ employees)</option>
                      <option value="agency" className="bg-white text-gray-900">Marketing Agency</option>
                      <option value="freelancer" className="bg-white text-gray-900">Freelancer</option>
                      <option value="other" className="bg-white text-gray-900">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Business Website (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your website" 
                      className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 focus:bg-white transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-8 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Complete Registration'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistForm;
