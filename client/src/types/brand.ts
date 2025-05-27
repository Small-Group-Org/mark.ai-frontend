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
} 