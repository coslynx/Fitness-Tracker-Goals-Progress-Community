'use client'

import React from 'react'
import { DashboardStatsProps } from '@/types/dashboard'
import { Card } from '@/presentation/components/ui/Card'
import { ProgressChart } from '@/presentation/components/features/progress/ProgressChart'
import { RecentActivity } from '@/presentation/components/features/dashboard/RecentActivity'
import { formatDate } from '@/lib/utils/formatters'

// Import the useGoals hook for managing goals
import { useGoals } from '@/lib/hooks/useGoals'

// Import the Goal entity for type safety
import { Goal } from '@/core/domain/entities/goal/Goal'

interface DashboardStatsProps {
  progressData: any[]
  recentActivity: any[]
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ progressData, recentActivity }) => {
  // Use the useGoals hook to access goals data and loading state
  const { goals, isLoading } = useGoals()

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <Card className=''>
        <h3 className='text-lg font-bold mb-2'>Overall Progress</h3>
        <p className='text-gray-700 text-sm'>
          {goals.length > 0 ? (
            <>
              {/* Calculate and display overall progress based on goals data */}
              {/* (e.g., average progress, total progress across goals) */}
              {/* Use `ProgressChart` to display progress data visually */}
              <ProgressChart progressData={progressData} />
            </>
          ) : (
            <p className='text-gray-500 text-sm'>No goals yet. Create your first goal to track your progress!</p>
          )}
        </p>
      </Card>

      <Card className=''>
        <h3 className='text-lg font-bold mb-2'>Active Goals</h3>
        <p className='text-gray-700 text-sm'>
          {goals.length > 0 ? (
            <ul className='space-y-3'>
              {goals.map((goal: Goal) => (
                <li key={goal.id} className='flex justify-between'>
                  <p className='text-gray-700 text-sm'>
                    {goal.type} - Target: {goal.targetValue}
                  </p>
                  <p className='text-gray-700 text-sm'>
                    Deadline: {formatDate(goal.deadline)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500 text-sm'>No goals yet. Create your first goal!</p>
          )}
        </p>
      </Card>

      <Card className=''>
        <h3 className='text-lg font-bold mb-2'>Recent Activity</h3>
        {/* Use `RecentActivity` to display recent activity data */}
        <RecentActivity recentActivity={recentActivity} />
      </Card>
    </div>
  )
}

export default DashboardStats