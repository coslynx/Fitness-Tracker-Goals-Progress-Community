'use client'

import React from 'react'
import { ButtonProps } from '../../../../types/ui'

// Ensure correct version of Tailwind CSS is imported
import 'tailwindcss/tailwind.css'

// Define a type for the Button component's props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  fullWidth?: boolean
}

// Implement the Button component as a functional React component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  ...props
}) => {
  // Define the button classes based on the 'variant' and 'fullWidth' props
  const buttonClasses = `bg-${
    variant === 'primary'
      ? 'blue-500'
      : variant === 'secondary'
      ? 'gray-400'
      : variant === 'tertiary'
      ? 'gray-300'
      : 'red-500'
  } hover:bg-${
    variant === 'primary'
      ? 'blue-700'
      : variant === 'secondary'
      ? 'gray-500'
      : variant === 'tertiary'
      ? 'gray-400'
      : 'red-700'
  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-${
    variant === 'primary'
      ? 'blue-500'
      : variant === 'secondary'
      ? 'gray-400'
      : variant === 'tertiary'
      ? 'gray-300'
      : 'red-500'
  } ${fullWidth ? 'w-full' : ''}`

  // Render the Button component with the defined classes and props
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

// Export the Button component
export default Button