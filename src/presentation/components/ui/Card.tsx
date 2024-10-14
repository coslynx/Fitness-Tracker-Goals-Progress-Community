'use client'

import React from 'react';
import { CardProps } from '../../../../types/ui';

// Ensure correct version of Tailwind CSS is imported
import 'tailwindcss/tailwind.css';

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;