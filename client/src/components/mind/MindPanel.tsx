import React, { useState, useEffect, useRef } from 'react';
import { User, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { BrandState } from '@/types/brand';
import TypewriterText from './TypewriterText';
import LoadingState from './LoadingState';

interface MindPanelProps {
  brandState: BrandState;
}

interface ExtendedBrandState extends BrandState {
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

const MindPanel: React.FC<MindPanelProps> = ({ brandState }) => {
  const [mindState, setMindState] = useState<ExtendedBrandState>({});
  const [animatingFields, setAnimatingFields] = useState<Set<string>>(new Set());
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const previousStateRef = useRef<ExtendedBrandState>({});

  // Update mindState and detect changes
  useEffect(() => {
    const extendedState: ExtendedBrandState = {
      ...brandState,
      content_strategy: {
        content_pillars: "Educational content, Industry insights, Behind-the-scenes",
        posting_frequency: "3-4 posts per week across all platforms",
        brand_voice: "Professional yet approachable, innovative, solution-focused"
      }
    };

    const previousState = previousStateRef.current;
    const newAnimatingFields = new Set<string>();

    // Check for changes in each section
    const checkSection = (sectionKey: keyof ExtendedBrandState, fields: string[]) => {
      const currentSection = extendedState[sectionKey] as Record<string, any> || {};
      const previousSection = previousState[sectionKey] as Record<string, any> || {};

      fields.forEach(field => {
        const fieldKey = `${sectionKey}.${field}`;
        if (currentSection[field] && currentSection[field] !== previousSection[field]) {
          newAnimatingFields.add(fieldKey);
        }
      });
    };

    checkSection('client_info', ['brand_name', 'industry', 'team_size']);
    checkSection('business_goals', ['pain_points', 'success_metrics']);
    checkSection('target_audience', ['demographics', 'psychographics']);
    checkSection('content_strategy', ['content_pillars', 'posting_frequency', 'brand_voice']);

    setAnimatingFields(newAnimatingFields);
    setMindState(extendedState);
    previousStateRef.current = extendedState;
  }, [brandState]);

  const handleAnimationComplete = (fieldKey: string) => {
    setAnimatingFields(prev => {
      const newSet = new Set(prev);
      newSet.delete(fieldKey);
      return newSet;
    });
    setCompletedFields(prev => new Set([...Array.from(prev), fieldKey]));
  };

  const hasData = Boolean(
    mindState.client_info?.brand_name ||
    mindState.business_goals?.pain_points ||
    mindState.target_audience?.demographics ||
    mindState.content_strategy?.content_pillars
  );

  if (!hasData) {
    return <LoadingState />;
  }

  const SectionCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    shape?: 'rounded' | 'cloud' | 'curved';
  }> = ({ title, icon, children, className = "", shape = 'rounded' }) => {
    const shapeClasses = {
      rounded: 'rounded-3xl',
      cloud: 'rounded-[2rem_1rem_2rem_1rem]',
      curved: 'rounded-[1.5rem_2.5rem_1.5rem_2.5rem]'
    };

    return (
      <div className={`bg-white shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 relative overflow-hidden group ${shapeClasses[shape]} ${className}`}>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mr-3 shadow-lg">
              {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          </div>
          <div className="space-y-3">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const DataField: React.FC<{
    label: string;
    value: string | null | undefined;
    fieldKey: string;
  }> = ({ label, value, fieldKey }) => {
    if (!value) return null;

    const isAnimating = animatingFields.has(fieldKey);
    const isCompleted = completedFields.has(fieldKey);

    return (
      <div className="space-y-1">
        <dt className="text-xs font-semibold text-blue-700 uppercase tracking-wide">{label}</dt>
        <dd className={`text-gray-700 text-sm leading-relaxed transition-all duration-500 ${
          isCompleted ? 'bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-2 border-l-4 border-blue-600' : ''
        }`}>
          {isAnimating ? (
            <TypewriterText 
              text={value} 
              delay={0}
              onComplete={() => handleAnimationComplete(fieldKey)}
            />
          ) : (
            <span className={isCompleted ? 'text-blue-800 font-medium' : ''}>{value}</span>
          )}
        </dd>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-8 px-4 md:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Brand Mind</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
        </div>

        {/* Main Grid Layout - Always 2x2 on larger screens */}
        <div className="h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden bg-white/20 backdrop-blur-sm p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr min-h-full">
            {/* Brand Information - Top Left */}
            {mindState.client_info && (
              <SectionCard
                title="Brand Information"
                icon={<User className="w-5 h-5 text-white" />}
                shape="rounded"
                className="bg-gradient-to-br from-blue-200 to-blue-300"
              >
                <dl className="space-y-3">
                  <DataField 
                    label="Brand Name" 
                    value={mindState.client_info.brand_name} 
                    fieldKey="client_info.brand_name"
                  />
                  <DataField 
                    label="Industry" 
                    value={mindState.client_info.industry} 
                    fieldKey="client_info.industry"
                  />
                  <DataField 
                    label="Team Size" 
                    value={mindState.client_info.team_size} 
                    fieldKey="client_info.team_size"
                  />
                </dl>
              </SectionCard>
            )}

            {/* Business Goals - Top Right */}
            {mindState.business_goals && (
              <SectionCard
                title="Business Goals"
                icon={<TrendingUp className="w-5 h-5 text-white" />}
                shape="cloud"
                className="bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <dl className="space-y-3">
                  <DataField 
                    label="Pain Points" 
                    value={mindState.business_goals.pain_points} 
                    fieldKey="business_goals.pain_points"
                  />
                  <DataField 
                    label="Success Metrics" 
                    value={mindState.business_goals.success_metrics} 
                    fieldKey="business_goals.success_metrics"
                  />
                </dl>
              </SectionCard>
            )}

            {/* Target Audience - Bottom Left */}
            {mindState.target_audience && (
              <SectionCard
                title="Target Audience"
                icon={<Users className="w-5 h-5 text-white" />}
                shape="curved"
                className="bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <dl className="space-y-3">
                  <DataField 
                    label="Demographics" 
                    value={mindState.target_audience.demographics} 
                    fieldKey="target_audience.demographics"
                  />
                  <DataField 
                    label="Psychographics" 
                    value={mindState.target_audience.psychographics} 
                    fieldKey="target_audience.psychographics"
                  />
                </dl>
              </SectionCard>
            )}

            {/* Brand Strategy - Bottom Right */}
            {mindState.content_strategy && (
              <SectionCard
                title="Brand Strategy"
                icon={<Lightbulb className="w-5 h-5 text-white" />}
                shape="cloud"
                className="bg-gradient-to-br from-blue-200 to-blue-300"
              >
                <dl className="space-y-3">
                  <DataField 
                    label="Content Pillars" 
                    value={mindState.content_strategy.content_pillars} 
                    fieldKey="content_strategy.content_pillars"
                  />
                  <DataField 
                    label="Posting Frequency" 
                    value={mindState.content_strategy.posting_frequency} 
                    fieldKey="content_strategy.posting_frequency"
                  />
                  <DataField 
                    label="Brand Voice" 
                    value={mindState.content_strategy.brand_voice} 
                    fieldKey="content_strategy.brand_voice"
                  />
                </dl>
              </SectionCard>
            )}
          </div>
        </div>

        {/* Floating Animation Indicator */}
        {animatingFields.size > 0 && (
          <div className="fixed bottom-6 right-6 bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <span className="text-sm font-medium">Updating insights...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MindPanel; 