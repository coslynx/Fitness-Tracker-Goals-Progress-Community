'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import { InputProps } from '../../../../types/ui';
import { useStore } from '@/lib/store';

// Ensure correct version of Tailwind CSS is imported
import 'tailwindcss/tailwind.css';

const Input: React.FC<InputProps> = ({
  type = 'text',
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  // Handle input change event
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // Call the provided onChange function to update the component's state
    onChange(event.target.value);
  };

  // Ensure proper type for the input based on the provided 'type' prop
  const inputType = type === 'password' ? 'password' : 'text';

  // Render the Input component with Tailwind CSS styling
  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={inputType}
        id={id}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : ''
        }`}
      />
      {/* Display error message if 'error' prop is true */}
      {error && (
        <p className="mt-2 text-red-500 text-sm">Please correct the input</p>
      )}
    </div>
  );
};

export default Input;