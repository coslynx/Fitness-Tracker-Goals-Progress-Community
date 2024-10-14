'use client'

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Goal } from '@/core/domain/entities/goal/Goal';
import { GoalType } from '@/types/goal';
import { Spinner } from '@/presentation/components/ui/Spinner';

interface SelectProps {
  label: string;
  value: GoalType;
  onChange: (value: GoalType) => void;
  options: GoalType[];
  disabled?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, disabled = false, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { goals, isLoading } = useStore();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: GoalType) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label htmlFor="goal-type" className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={handleToggle}
          className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          disabled={disabled}
        >
          {value}
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Select;