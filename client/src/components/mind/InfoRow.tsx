import React from 'react';
import { InfoRowProps } from '../../types/mind';

const formatValue = (value: any): React.ReactNode => {
  if (value === null || value === undefined) {
    return <span className="text-gray-500 italic">Not learned yet</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-gray-500 italic">Not learned yet</span>;
    }
    return value.join(', ');
  }
  if (typeof value === 'object') {
    return <span className="text-gray-500 italic">Not learned yet</span>;
  }
  return value;
};

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, isNew }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium text-gray-300">{label}</p>
      {isNew && (
        <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
          New
        </span>
      )}
    </div>
    <p className="text-sm text-gray-400">{formatValue(value)}</p>
  </div>
); 