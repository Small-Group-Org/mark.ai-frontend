import { InfoCard } from "@/components/mind/InfoCard";
import { InfoRow } from "@/components/mind/InfoRow";
import { MainInfo } from "@/components/mind/MainInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import { OnboardingState } from "@/types";
import { Info } from "lucide-react";

const Mind = () => {
  const { onboardingState } = useAuthStore();
  const [newlyLearned, setNewlyLearned] = useState<Record<string, boolean>>({});
  const previousStateRef = useRef<OnboardingState | null>(null);
  
  // Add refs for each section
  const businessGoalsRef = useRef<HTMLDivElement>(null);
  const targetAudienceRef = useRef<HTMLDivElement>(null);
  const contentStrategyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onboardingState?.onboarding?.current_json_state) return;

    const currentState = onboardingState.onboarding.current_json_state;
    const prevState = previousStateRef.current;

    if (prevState) {
      const newItems: Record<string, boolean> = {};

      // Check client info
      Object.entries(currentState.client_info || {}).forEach(([key, value]) => {
        const prevValue = prevState.client_info?.[key as keyof typeof prevState.client_info];
        if (prevValue === null && value !== null) {
          newItems[`client_info.${key}`] = true;
        }
      });

      // Check business goals
      Object.entries(currentState.business_goals || {}).forEach(([key, value]) => {
        const prevValue = prevState.business_goals?.[key as keyof typeof prevState.business_goals];
        if (prevValue === null && value !== null) {
          newItems[`business_goals.${key}`] = true;
        }
      });

      // Check target audience
      Object.entries(currentState.target_audience || {}).forEach(([key, value]) => {
        const prevValue = prevState.target_audience?.[key as keyof typeof prevState.target_audience];
        if (prevValue === null && value !== null) {
          newItems[`target_audience.${key}`] = true;
        }
      });

      // Check content strategy
      Object.entries(currentState.content_strategy || {}).forEach(([key, value]) => {
        const prevValue = prevState.content_strategy?.[key as keyof typeof prevState.content_strategy];
        if (prevValue === null && value !== null) {
          newItems[`content_strategy.${key}`] = true;
        }
      });

      setNewlyLearned(newItems);

      // Scroll to the section with new items
      if (Object.keys(newItems).some(key => key.startsWith('business_goals'))) {
        businessGoalsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (Object.keys(newItems).some(key => key.startsWith('target_audience'))) {
        targetAudienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (Object.keys(newItems).some(key => key.startsWith('content_strategy'))) {
        contentStrategyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    previousStateRef.current = currentState;
  }, [onboardingState]);

  if (!onboardingState) {
    return (
      <div className=" bg-slate-900 overflow-auto">
        <div className="p-4 md:p-6">
          <div className="max-w-full mx-auto">
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mindData = onboardingState.onboarding.current_json_state;

  const hasBusinessGoals = Object.values(mindData.business_goals || {}).some(v => v !== null);
  const hasTargetAudience = Object.values(mindData.target_audience || {}).some(v => v !== null);
  const hasContentStrategy = Object.values(mindData.content_strategy || {}).some(v => v !== null);

  return (
    <div className="max-h-[calc(100vh-135px)] md:max-h-[calc(100vh-70px)] bg-slate-900 overflow-auto">
      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto">
          <MainInfo 
            clientInfo={mindData.client_info} 
            newlyLearned={newlyLearned}
          />

          {/* Responsive grid that wraps cards when they reach min-width */}
          <div className="flex flex-wrap gap-4 md:gap-6 justify-start">
            <InfoCard 
              ref={businessGoalsRef}
              title="Business Goals" 
              icon="🎯" 
              isEmpty={!hasBusinessGoals} 
              className="min-w-[350px] flex-1"
            >
              {hasBusinessGoals && (
                <>
                  <InfoRow 
                    label="Primary Objective" 
                    value={mindData.business_goals?.primary_objective} 
                    isNew={newlyLearned['business_goals.primary_objective']}
                  />
                  <InfoRow 
                    label="Secondary Objectives" 
                    value={mindData.business_goals?.secondary_objectives} 
                    isNew={newlyLearned['business_goals.secondary_objectives']}
                  />
                  <InfoRow 
                    label="Pain Points" 
                    value={mindData.business_goals?.pain_points} 
                    isNew={newlyLearned['business_goals.pain_points']}
                  />
                  <InfoRow 
                    label="Success Metrics" 
                    value={mindData.business_goals?.success_metrics} 
                    isNew={newlyLearned['business_goals.success_metrics']}
                  />
                </>
              )}
            </InfoCard>

            <InfoCard 
              ref={targetAudienceRef}
              title="Target Audience" 
              icon="👥" 
              isEmpty={!hasTargetAudience} 
              className="min-w-[350px] flex-1"
            >
              {hasTargetAudience && (
                <>
                  <InfoRow 
                    label="Customer Segments" 
                    value={mindData.target_audience?.customer_segments} 
                    isNew={newlyLearned['target_audience.customer_segments']}
                  />
                  <InfoRow 
                    label="Demographics" 
                    value={mindData.target_audience?.demographics} 
                    isNew={newlyLearned['target_audience.demographics']}
                  />
                  <InfoRow 
                    label="Psychographics" 
                    value={mindData.target_audience?.psychographics} 
                    isNew={newlyLearned['target_audience.psychographics']}
                  />
                </>
              )}
            </InfoCard>

            <InfoCard 
              ref={contentStrategyRef}
              title="Content Strategy" 
              icon="📝" 
              isEmpty={!hasContentStrategy} 
              className="min-w-[350px] flex-1"
            >
              {hasContentStrategy && (
                <>
                  <InfoRow 
                    label="Brand Voice" 
                    value={mindData.content_strategy?.brand_voice} 
                    isNew={newlyLearned['content_strategy.brand_voice']}
                  />
                  <InfoRow 
                    label="Key Messaging" 
                    value={mindData.content_strategy?.key_messaging} 
                    isNew={newlyLearned['content_strategy.key_messaging']}
                  />
                  <InfoRow 
                    label="Content Types" 
                    value={mindData.content_strategy?.preferred_content_types} 
                    isNew={newlyLearned['content_strategy.preferred_content_types']}
                  />
                  <InfoRow 
                    label="Posting Frequency" 
                    value={mindData.content_strategy?.posting_frequency} 
                    isNew={newlyLearned['content_strategy.posting_frequency']}
                  />
                </>
              )}
            </InfoCard>

            <InfoCard title="Learning Progress" icon="📊" className="min-w-[350px] flex-1">
              <InfoRow 
                label="Missing Info" 
                value={mindData.onboarding_progress?.missing_required_info?.length === 0 ? 
                  "All required info collected" : 
                  mindData.onboarding_progress?.missing_required_info
                } 
              />
              <InfoRow 
                label="Additional Data" 
                value={Object.keys(mindData.additional_information || {}).length === 0 ? 
                  "None" : 
                  `${Object.keys(mindData.additional_information).length} items`
                } 
              />
            </InfoCard>
          </div>

          {/* Footer Info */}
          <div className="mt-6">
            <p className="text-gray-500 text-sm italic">
             <Info className="w-4 h-4 inline-block mr-1" /> Data updates automatically as the Mark learns from conversations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mind;