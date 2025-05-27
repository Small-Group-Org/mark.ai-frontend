import React from "react";
import MindPanel from "@/components/mind/MindPanel";
import { BrandState } from "@/types/brand";

// Converter function to transform API response to BrandState format
const convertToBrandState = (apiData: any): BrandState => {
  return {
    client_info: {
      brand_name: apiData.client_info?.company_name || null,
      industry: apiData.client_info?.industry || null,
      team_size: apiData.client_info?.team_size || null,
      website: apiData.client_info?.website || null,
      budget: apiData.client_info?.budget || null,
      location: apiData.client_info?.location || null
    },
    business_goals: {
      pain_points: apiData.business_goals?.pain_points || null,
      success_metrics: apiData.business_goals?.success_metrics || null,
      primary_objective: apiData.business_goals?.primary_objective || null,
      secondary_objectives: apiData.business_goals?.secondary_objectives || null
    },
    target_audience: {
      demographics: apiData.target_audience?.demographics || null,
      psychographics: apiData.target_audience?.psychographics || null,
      customer_segments: apiData.target_audience?.customer_segments || null
    },
    content_strategy: {
      content_pillars: apiData.content_strategy?.key_messaging || null,
      posting_frequency: apiData.content_strategy?.posting_frequency || null,
      brand_voice: apiData.content_strategy?.brand_voice || null,
      preferred_content_types: apiData.content_strategy?.preferred_content_types || null
    },
    onboarding_progress: {
      completion_percentage: null,
      next_steps: null,
      missing_required_info: apiData.onboarding_progress?.missing_required_info || []
    },
    additional_information: {
      notes: null,
      preferences: null,
      ...apiData.additional_information
    }
  };
};

export default function MindRoute() {
  // Sample API data in the format you provided
  const apiData = {
    "client_info": {
      "budget": null,
      "website": "https://www.smallgrp.com/",
      "industry": "food related",
      "location": null,
      "team_size": null,
      "company_name": "SMG"
    },
    "business_goals": {
      "pain_points": null,
      "success_metrics": null,
      "primary_objective": "Gain users",
      "secondary_objectives": null
    },
    "target_audience": {
      "demographics": "around 20 yrs old",
      "psychographics": null,
      "customer_segments": null
    },
    "content_strategy": {
      "brand_voice": "Fun and energetic",
      "key_messaging": null,
      "posting_frequency": null,
      "preferred_content_types": null
    },
    "onboarding_progress": {
      "missing_required_info": []
    },
    "additional_information": {}
  };

  // Convert API data to BrandState format
  const brandState: BrandState = convertToBrandState(apiData);

  return <MindPanel brandState={brandState} />;
}
