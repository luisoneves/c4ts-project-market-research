import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-lg hover:-translate-y-1',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
