import React from "react";
import MindPanel from "@/components/mind/MindPanel";
import { BrandState } from "@/types/brand";

export default function MindRoute() {
  // Sample brand data - replace with actual API call
  const brandState: BrandState = {
    client_info: {
      brand_name: "TechFlow Solutions",
      industry: "Software Development & Digital Marketing",
      team_size: "25-50 employees"
    },
    business_goals: {
      pain_points: "Struggling with lead generation and customer retention. Need to improve brand visibility in competitive market.",
      success_metrics: "Increase monthly recurring revenue by 40%, improve customer acquisition cost by 25%, achieve 90% customer satisfaction score"
    },
    target_audience: {
      demographics: "Tech-savvy professionals aged 28-45, primarily in urban areas, with household income $75K+",
      psychographics: "Innovation-driven individuals who value efficiency, quality, and cutting-edge solutions. Early adopters of technology."
    }
  };

  return <MindPanel brandState={brandState} />;
}
