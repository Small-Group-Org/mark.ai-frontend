import React, { useState, useEffect } from 'react';
import { User, TrendingUp, Users } from 'lucide-react';
import { BrandState } from '@/types/brand';
import InfoCard from './InfoCard';
import DataField from './DataField';
import LoadingState from './LoadingState';

interface MindPanelProps {
  brandState: BrandState;
}

const MindPanel: React.FC<MindPanelProps> = ({ brandState }) => {
  const [animationQueue, setAnimationQueue] = useState<string[]>([]);
  const [completedAnimations, setCompletedAnimations] = useState<Set<string>>(new Set());

  // Extract data safely
  const clientInfo = brandState?.client_info || {};
  const businessGoals = brandState?.business_goals || {};
  const targetAudience = brandState?.target_audience || {};

  // Check if we have any data
  const hasData = Boolean(
    clientInfo.brand_name || 
    clientInfo.industry || 
    clientInfo.team_size ||
    businessGoals.pain_points || 
    businessGoals.success_metrics ||
    targetAudience.demographics || 
    targetAudience.psychographics
  );

  // Create animation queue when data changes
  useEffect(() => {
    const newQueue: string[] = [];
    
    if (clientInfo.brand_name) newQueue.push('brand_name');
    if (clientInfo.industry) newQueue.push('industry');
    if (clientInfo.team_size) newQueue.push('team_size');
    if (businessGoals.pain_points) newQueue.push('pain_points');
    if (businessGoals.success_metrics) newQueue.push('success_metrics');
    if (targetAudience.demographics) newQueue.push('demographics');
    if (targetAudience.psychographics) newQueue.push('psychographics');

    setAnimationQueue(newQueue);
    setCompletedAnimations(new Set());
  }, [brandState]);

  const handleAnimationComplete = (field: string) => {
    setCompletedAnimations(prev => new Set([...Array.from(prev), field]));
  };

  const getAnimationDelay = (field: string) => {
    const index = animationQueue.indexOf(field);
    return index === -1 ? 0 : index * 1200;
  };

  const shouldAnimate = (field: string) => {
    return animationQueue.includes(field) && !completedAnimations.has(field);
  };

  const isCompleted = (field: string) => {
    return completedAnimations.has(field);
  };

  if (!hasData) {
    return <LoadingState />;
  }

  return (
    <div className="w-full h-screen bg-gray-50 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Brand Profile</h1>
          <p className="text-lg text-gray-600">Comprehensive brand intelligence and insights</p>
        </div>

        {/* Brand Info Section */}
        {(clientInfo.brand_name || clientInfo.industry || clientInfo.team_size) && (
          <InfoCard 
            icon={<User className="w-6 h-6 text-white" />}
            title="Brand Information"
          >
            <dl className="space-y-4">
              <DataField 
                label="Brand Name" 
                value={clientInfo.brand_name || null} 
                fieldKey="brand_name"
                shouldAnimate={shouldAnimate('brand_name')}
                isCompleted={isCompleted('brand_name')}
                animationDelay={getAnimationDelay('brand_name')}
                onAnimationComplete={handleAnimationComplete}
              />
              <DataField 
                label="Industry" 
                value={clientInfo.industry || null} 
                fieldKey="industry"
                shouldAnimate={shouldAnimate('industry')}
                isCompleted={isCompleted('industry')}
                animationDelay={getAnimationDelay('industry')}
                onAnimationComplete={handleAnimationComplete}
              />
              <DataField 
                label="Team Size" 
                value={clientInfo.team_size || null} 
                fieldKey="team_size"
                shouldAnimate={shouldAnimate('team_size')}
                isCompleted={isCompleted('team_size')}
                animationDelay={getAnimationDelay('team_size')}
                onAnimationComplete={handleAnimationComplete}
              />
            </dl>
          </InfoCard>
        )}

        {/* Business Goals Section */}
        {(businessGoals.pain_points || businessGoals.success_metrics) && (
          <InfoCard 
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            title="Business Goals"
          >
            <dl className="space-y-4">
              <DataField 
                label="Pain Points" 
                value={businessGoals.pain_points || null} 
                fieldKey="pain_points"
                shouldAnimate={shouldAnimate('pain_points')}
                isCompleted={isCompleted('pain_points')}
                animationDelay={getAnimationDelay('pain_points')}
                onAnimationComplete={handleAnimationComplete}
              />
              <DataField 
                label="Success Metrics" 
                value={businessGoals.success_metrics || null} 
                fieldKey="success_metrics"
                shouldAnimate={shouldAnimate('success_metrics')}
                isCompleted={isCompleted('success_metrics')}
                animationDelay={getAnimationDelay('success_metrics')}
                onAnimationComplete={handleAnimationComplete}
              />
            </dl>
          </InfoCard>
        )}

        {/* Target Audience Section */}
        {(targetAudience.demographics || targetAudience.psychographics) && (
          <InfoCard 
            icon={<Users className="w-6 h-6 text-white" />}
            title="Target Audience"
          >
            <dl className="space-y-4">
              <DataField 
                label="Demographics" 
                value={targetAudience.demographics || null} 
                fieldKey="demographics"
                shouldAnimate={shouldAnimate('demographics')}
                isCompleted={isCompleted('demographics')}
                animationDelay={getAnimationDelay('demographics')}
                onAnimationComplete={handleAnimationComplete}
              />
              <DataField 
                label="Psychographics" 
                value={targetAudience.psychographics || null} 
                fieldKey="psychographics"
                shouldAnimate={shouldAnimate('psychographics')}
                isCompleted={isCompleted('psychographics')}
                animationDelay={getAnimationDelay('psychographics')}
                onAnimationComplete={handleAnimationComplete}
              />
            </dl>
          </InfoCard>
        )}
      </div>
    </div>
  );
};

export default MindPanel; 