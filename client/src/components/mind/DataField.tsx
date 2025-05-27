import React from 'react';
import TypewriterText from './TypewriterText';

interface DataFieldProps {
  label: string;
  value: string | null;
  fieldKey: string;
  shouldAnimate: boolean;
  isCompleted: boolean;
  animationDelay: number;
  onAnimationComplete: (field: string) => void;
}

const DataField: React.FC<DataFieldProps> = ({ 
  label, 
  value, 
  fieldKey,
  shouldAnimate,
  isCompleted,
  animationDelay,
  onAnimationComplete
}) => {
  if (!value) return null;

  return (
    <div className="space-y-2">
      <dt className="text-sm font-semibold text-violet-700 uppercase tracking-wide">{label}</dt>
      <dd className={`text-gray-700 text-base leading-relaxed ${
        isCompleted ? 'animate-pulse bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg p-3 shadow-sm border border-violet-100' : ''
      }`}>
        {shouldAnimate ? (
          <TypewriterText 
            text={value} 
            delay={animationDelay}
            onComplete={() => onAnimationComplete(fieldKey)}
          />
        ) : (
          <span className={isCompleted ? 'text-violet-800 font-medium' : ''}>{value}</span>
        )}
      </dd>
    </div>
  );
};

export default DataField; 