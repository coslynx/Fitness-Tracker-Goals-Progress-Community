'use client'

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'gray-500' }) => {
  return (
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-4 border-t-transparent ${color}`}
    />
  );
};

export default Spinner;