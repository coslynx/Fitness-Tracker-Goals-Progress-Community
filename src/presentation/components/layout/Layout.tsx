'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useStore } from '@/lib/store'
import LandingPage from '@/presentation/components/landing/main'
import { GoalList } from '@/presentation/components/features/goals/GoalList'
import { GoalCard } from '@/presentation/components/features/goals/GoalCard'
import { GoalForm } from '@/presentation/components/features/goals/GoalForm'
import { ProgressChart } from '@/presentation/components/features/progress/ProgressChart'
import { ProgressLog } from '@/presentation/components/features/progress/ProgressLog'
import { DashboardStats } from '@/presentation/components/features/dashboard/DashboardStats'
import { RecentActivity } from '@/presentation/components/features/dashboard/RecentActivity'
import { CommunityFeed } from '@/presentation/components/features/community/CommunityFeed'
import { UserProfile } from '@/presentation/components/features/community/UserProfile'
import { useGoals } from '@/lib/hooks/useGoals'
import { useUser } from '@/lib/hooks/useUser'
import { GoalType } from '@/types/goal'
import { Goal } from '@/core/domain/entities/goal/Goal'
import { useState, useEffect } from 'react'
import { fetchGoals } from '@/lib/api/client'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

const Layout = () => {
  const { data: session } = useSession()
  const store = useStore()
  const { goals, isLoading } = useGoals()
  const { user, setUser } = useUser()

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isCreatingGoal, setIsCreatingGoal] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      fetchGoals(session.user.id).then(goals => {
        store.setGoals(goals)
      })
    }
  }, [session])

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsCreatingGoal(false)
  }

  const handleCreateGoal = () => {
    setIsCreatingGoal(true)
    setSelectedGoal(null)
  }

  const handleCloseGoalForm = () => {
    setIsCreatingGoal(false)
    setSelectedGoal(null)
  }

  if (!session) {
    return <LandingPage />
  }

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <div className='flex-none bg-gray-800 py-3'>
            {/* App Logo and Navigation */}
          </div>
          <div className='flex flex-1 flex-col overflow-auto'>
            {/* Main Content */}
            {isCreatingGoal && (
              <GoalForm
                onClose={handleCloseGoalForm}
                initialGoalData={{ type: GoalType.weight_loss, targetValue: 0, deadline: new Date() }}
              />
            )}
            {!isCreatingGoal && (
              <>
                <div className='flex-1 flex flex-col gap-4 p-4 overflow-auto'>
                  {isLoading ? (
                    <p className='text-center'>Loading...</p>
                  ) : (
                    <>
                      {goals.length > 0 && (
                        <GoalList goals={goals} onGoalSelect={handleGoalSelect} />
                      )}
                      {goals.length === 0 && (
                        <p className='text-center'>No goals yet. Create your first goal!</p>
                      )}
                    </>
                  )}
                  {selectedGoal && (
                    <div className='p-4 rounded-md shadow-md bg-white'>
                      <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-bold'>{selectedGoal.type}</h2>
                        <button onClick={handleCreateGoal} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                          New Goal
                        </button>
                      </div>
                      <GoalCard goal={selectedGoal} />
                      <div className='mt-6'>
                        <ProgressChart goal={selectedGoal} />
                        <ProgressLog goal={selectedGoal} />
                      </div>
                    </div>
                  )}
                </div>
                <Footer />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Layout