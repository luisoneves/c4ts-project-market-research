import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({ progress, showLabel = true, size = 'md', className = '' }: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4'
  };

  return (
    <div className={className}>
      <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="bg-gradient-to-r from-purple-500 to-purple-700 h-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
      {showLabel && (
        <span className="text-xs text-gray-600 mt-1 block">{Math.round(progress)}%</span>
      )}
    </div>
  );
}
