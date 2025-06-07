export interface MindData {
  current_json_state: {
    client_info: {
      budget: string | null;
      website: string | null;
      industry: string | null;
      location: string | null;
      team_size: string | null;
      company_name: string | null;
    };
    business_goals: {
      pain_points: string | null;
      success_metrics: string | null;
      primary_objective: string | null;
      secondary_objectives: string | null;
    };
    target_audience: {
      demographics: string | null;
      psychographics: string | null;
      customer_segments: string | null;
    };
    content_strategy: {
      brand_voice: string | null;
      key_messaging: string | null;
      posting_frequency: string | null;
      preferred_content_types: string[] | null;
    };
    onboarding_progress: {
      missing_required_info: string[];
    };
    additional_information: Record<string, any>;
  };
}

export interface InfoCardProps {
  title: string;
  icon: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
  className?: string;
}

export interface InfoRowProps {
  label: string;
  value: any;
  isNew?: boolean;
} 