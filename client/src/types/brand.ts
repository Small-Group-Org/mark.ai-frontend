export interface BrandState {
  client_info?: {
    brand_name?: string | null;
    industry?: string | null;
    team_size?: string | null;
  };
  business_goals?: {
    pain_points?: string | null;
    success_metrics?: string | null;
  };
  target_audience?: {
    demographics?: string | null;
    psychographics?: string | null;
  };
  content_strategy?: {
    content_pillars?: string | null;
    posting_frequency?: string | null;
    brand_voice?: string | null;
  };
  onboarding_progress?: {
    completion_percentage?: string | null;
    next_steps?: string | null;
  };
  additional_information?: {
    notes?: string | null;
    preferences?: string | null;
  };
} 