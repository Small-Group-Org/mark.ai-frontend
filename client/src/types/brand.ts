export interface BrandState {
  client_info?: {
    brand_name?: string | null;
    industry?: string | null;
    team_size?: string | null;
    website?: string | null;
    budget?: string | null;
    location?: string | null;
  };
  business_goals?: {
    pain_points?: string | null;
    success_metrics?: string | null;
    primary_objective?: string | null;
    secondary_objectives?: string | null;
  };
  target_audience?: {
    demographics?: string | null;
    psychographics?: string | null;
    customer_segments?: string | null;
  };
  content_strategy?: {
    content_pillars?: string | null;
    posting_frequency?: string | null;
    brand_voice?: string | null;
    key_messaging?: string | null;
    preferred_content_types?: string | null;
  };
  onboarding_progress?: {
    completion_percentage?: string | null;
    next_steps?: string | null;
    missing_required_info?: string[];
  };
  additional_information?: {
    notes?: string | null;
    preferences?: string | null;
    [key: string]: any;
  };
} 