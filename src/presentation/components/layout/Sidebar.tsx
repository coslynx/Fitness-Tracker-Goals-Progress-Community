'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useStore } from '@/lib/store'
import { useUser } from '@/lib/hooks/useUser'
import { User } from '@/core/domain/entities/user/User'

// Import necessary UI components for the sidebar
import { Button } from '@/presentation/components/ui/Button'
import { Card } from '@/presentation/components/ui/Card'
import { Input } from '@/presentation/components/ui/Input'
import { Select } from '@/presentation/components/ui/Select'
import { Spinner } from '@/presentation/components/ui/Spinner'

// Import necessary hooks and functions for sidebar functionality
import { useGoals } from '@/lib/hooks/useGoals'
import { Goal } from '@/core/domain/entities/goal/Goal'
import { fetchGoals } from '@/lib/api/client'
import { GoalType } from '@/types/goal'

const Sidebar = () => {
  // Get the current user from the session and the store
  const { data: session } = useSession()
  const { user, setUser } = useUser()
  const store = useStore()

  // Use the useGoals hook to manage goals
  const { goals, isLoading } = useGoals()

  // Handle selection of a goal
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)

  // Handle creation of a new goal
  const [isCreatingGoal, setIsCreatingGoal] = useState(false)

  // Fetch goals when the user is logged in
  useEffect(() => {
    if (session?.user?.id) {
      fetchGoals(session.user.id).then(goals => {
        store.setGoals(goals)
      })
    }
  }, [session])

  // Handle goal selection
  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsCreatingGoal(false)
  }

  // Handle goal creation
  const handleCreateGoal = () => {
    setIsCreatingGoal(true)
    setSelectedGoal(null)
  }

  // Handle closing the goal form
  const handleCloseGoalForm = () => {
    setIsCreatingGoal(false)
    setSelectedGoal(null)
  }

  // Check if the user is logged in
  if (!session) {
    return null // Or display a "Login to view sidebar" message
  }

  // Render the sidebar content
  return (
    <aside className="hidden lg:block lg:w-64 lg:bg-gray-800 lg:flex-none">
      <div className="p-4 rounded-md shadow-md bg-white">
        {/* Sidebar Header */}
        <h2 className="text-xl font-bold mb-4">
          Welcome, {user?.username || 'User'}!
        </h2>

        {/* User Profile Card (if needed) */}
        {user && (
          <Card className="mb-4">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">{user.username}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Links */}
        <nav className="mb-4">
          <ul className="space-y-4">
            {/* Dashboard Link */}
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>

            {/* Goals Link */}
            <li>
              <Link
                href="/goals"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Goals
              </Link>
            </li>

            {/* Progress Link */}
            <li>
              <Link
                href="/progress"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Progress
              </Link>
            </li>

            {/* Community Link */}
            <li>
              <Link
                href="/community"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Community
              </Link>
            </li>

            {/* Settings Link */}
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Goal Creation Button */}
        <Button
          onClick={handleCreateGoal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Goal
        </Button>

        {/* Goal Form (if active) */}
        {isCreatingGoal && (
          <GoalForm
            onClose={handleCloseGoalForm}
            initialGoalData={{ type: GoalType.weight_loss, targetValue: 0, deadline: new Date() }}
          />
        )}

        {/* Goal List (if not creating a goal) */}
        {!isCreatingGoal && (
          <div className="mt-4">
            {isLoading ? (
              <Spinner />
            ) : (
              <GoalList goals={goals} onGoalSelect={handleGoalSelect} />
            )}
          </div>
        )}

        {/* Selected Goal Details (if a goal is selected) */}
        {selectedGoal && (
          <div className="mt-4">
            <GoalCard goal={selectedGoal} />
            <div className="mt-4">
              <ProgressChart goal={selectedGoal} />
              <ProgressLog goal={selectedGoal} />
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar