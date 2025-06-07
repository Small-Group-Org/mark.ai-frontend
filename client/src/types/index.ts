export interface Message {
  id: string;
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

export type PlatformType =
| "bluesky"
| "facebook"
| "gmb"
| "instagram"
| "linkedin"
| "pinterest"
| "reddit"
| "telegram"
| "threads"
| "tiktok"
| "twitter"
| "youtube";

export interface AyrsharePlatformDetails {
  label: string;
  value: PlatformType;
  isConnected: boolean;
  isEnabled: boolean;
  img?: any;
  toggleColor?: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  plan: string;
  status: string;
  _id: string;
}

export interface PostType {
  id: "post" | "story" | "reel";
  label: string;
}

export interface UserCredential {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  rememberMe?: boolean;
  agreeToTerms?: boolean;
}

export interface OnboardingClientInfo {
  budget: string | null;
  website: string | null;
  industry: string | null;
  location: string | null;
  team_size: string | null;
  company_name: string | null;
}

export interface OnboardingBusinessGoals {
  pain_points: string | null;
  success_metrics: string | null;
  primary_objective: string | null;
  secondary_objectives: string | null;
}

export interface OnboardingTargetAudience {
  demographics: string | null;
  psychographics: string | null;
  customer_segments: string | null;
}

export interface OnboardingContentStrategy {
  brand_voice: string | null;
  key_messaging: string | null;
  posting_frequency: string | null;
  preferred_content_types: string | null;
}

export interface OnboardingProgress {
  missing_required_info: string[];
}

export interface OnboardingState {
  client_info: OnboardingClientInfo;
  business_goals: OnboardingBusinessGoals;
  target_audience: OnboardingTargetAudience;
  content_strategy: OnboardingContentStrategy;
  onboarding_progress: OnboardingProgress;
  additional_information: Record<string, any>;
}

export interface OnboardingResponse {
  current_json_state: OnboardingState;
  onboarding_complete: boolean;
  last_updated: string;
}
