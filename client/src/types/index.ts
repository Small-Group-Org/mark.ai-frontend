export interface Message {
  id: string;
  text: string | JSX.Element;
  sender: "user" | "mark" | "system";
  timestamp?: Date;
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

// isEnabled - platform enabled in the backend
// isConnected - platform connected to the user's account
// toggleStatus - platform toggled on in the frontend (for the user)
export interface AyrsharePlatformDetails {
  label: string;
  value: PlatformType;
  isConnected: boolean;
  isEnabled: boolean;
  toggleStatus: boolean;
  img?: any;
  toggleColor?: string;
  willLaunching?: boolean;
  postType?: {
    [key in SupportedPostType]: boolean;
  };
  feature?: {
    location: boolean;
    collab: boolean;
  };
  mediaGuidelines?: string;
}

export type SupportedPostType = "carousel" | "video" | "text" | "reel" | "story";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  plan: string;
  status: string;
  _id: string;
  activePlatforms: {
    [key in PlatformType]: boolean;
  };
}

export interface PostType {
  id: SupportedPostType;
  label: string;
}

export type PostTypeConfig = {
  [key in SupportedPostType]: {
    maxFiles: number;
    allowedTypes: string;
    showCarousel: boolean,
    allowMultiple: boolean,
    emptyText: string
  }
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
  onboarding: {
    current_json_state: OnboardingState;
    onboarding_complete: boolean;
    last_updated: string;
  };
  websiteScraping: WebsiteScraping;
}

export interface WebsiteScraping {
  website_url: string;
  website_logo_url: string | null;
  scraping_status: 'pending' | 'in_progress' | 'completed' | 'failed';
  raw_content: string | null;
  content_summary: string | null;
  scraping_attempts: number;
  last_scraped: string | null;
  created_at: string;
  updated_at: string;
  error_message: string | null;
}

export interface Location {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
}

