'use client'

import React from 'react'
import { Goal } from '@/core/domain/entities/goal/Goal'
import { GoalCard } from './GoalCard'
import { GoalListProps } from '@/types/goal'

// Ensure correct version of Tailwind CSS is imported
import 'tailwindcss/tailwind.css'

// Define a type for the GoalList component's props
interface GoalListProps extends React.PropsWithChildren<GoalListProps> {}

// Implement the GoalList component as a functional React component
const GoalList: React.FC<GoalListProps> = ({ goals, onGoalSelect }) => {
  // Render the GoalList component with the defined classes and props
  return (
    <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {goals.map((goal) => (
        <li key={goal.id} onClick={() => onGoalSelect(goal)}>
          <GoalCard goal={goal} />
        </li>
      ))}
    </ul>
  )
}

// Export the GoalList component
export default GoalList