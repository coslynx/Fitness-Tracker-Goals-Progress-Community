'use client'

import React from 'react'
import { ProgressLogProps } from '@/types/progress'
import { Goal } from '@/core/domain/entities/goal/Goal'
import { ProgressEntry } from '@/core/domain/entities/progress/ProgressEntry'
import { formatDate } from '@/lib/utils/formatters'

// Import necessary UI components
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'

interface ProgressLogProps {
  goal: Goal
  progressData: ProgressEntry[]
}

const ProgressLog: React.FC<ProgressLogProps> = ({ goal, progressData }) => {
  // Filter progress data for the current goal
  const goalProgress = progressData.filter(
    (entry) => entry.goalId === goal.id
  )

  // Sort progress entries by date in descending order
  goalProgress.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Card className='mt-4'>
      <h3 className='text-lg font-bold mb-2'>Progress Log</h3>
      <ul className='space-y-3'>
        {goalProgress.length > 0 ? (
          goalProgress.map((entry) => (
            <li key={entry.id} className='flex justify-between'>
              <p className='text-gray-700 text-sm'>
                {formatDate(entry.date)} - {entry.value}
              </p>
              <Button
                variant='tertiary'
                onClick={() => {
                  // Handle deleting progress entry
                  // (Implement logic to delete entry from progressData and update database)
                }}
              >
                Delete
              </Button>
            </li>
          ))
        ) : (
          <li className='text-gray-500 text-sm'>No progress entries yet.</li>
        )}
      </ul>
    </Card>
  )
}

export default ProgressLog