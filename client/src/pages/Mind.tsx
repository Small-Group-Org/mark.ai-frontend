import React, { useEffect, useState } from "react";
import MindPanel from "@/components/mind/MindPanel";
import { BrandState } from "@/types/brand";

export default function MindRoute() {
  const [loading, setLoading] = useState(true);
  const [brandState, setBrandState] = useState<BrandState>({});

  // Simulate loading delay and data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      // Sample brand data - replace with actual API call
      setBrandState({
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
      });
      setLoading(false);
    }, 1500); // Simulate 1.5s loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-violet-500 rounded-full animate-spin"></div>
          <p className="mt-3 text-violet-600">Loading mind data...</p>
        </div>
      </div>
    );
  }

  return <MindPanel brandState={brandState} />;
}
