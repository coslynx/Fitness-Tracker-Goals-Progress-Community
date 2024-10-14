'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { GoalList } from '@/presentation/components/features/goals/GoalList';
import { GoalCard } from '@/presentation/components/features/goals/GoalCard';
import { GoalForm } from '@/presentation/components/features/goals/GoalForm';
import { ProgressChart } from '@/presentation/components/features/progress/ProgressChart';
import { ProgressLog } from '@/presentation/components/features/progress/ProgressLog';
import { GoalType } from '@/types/goal';
import { Goal } from '@/core/domain/entities/goal/Goal';
import { fetchGoals, fetchProgressData } from '@/lib/api/client';

const ProgressPage = () => {
  const { data: session } = useSession();
  const store = useStore();
  const { goals, isLoading: goalsLoading } = useGoals();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchGoals(session.user.id).then(goals => {
        store.setGoals(goals);
      });
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProgressData(session.user.id).then(data => {
        setProgressData(data);
      });
    }
  }, [session]);

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsCreatingGoal(false);
  };

  const handleCreateGoal = () => {
    setIsCreatingGoal(true);
    setSelectedGoal(null);
  };

  const handleCloseGoalForm = () => {
    setIsCreatingGoal(false);
    setSelectedGoal(null);
  };

  if (!session) {
    return <p>Please log in to view your progress.</p>;
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="hidden lg:block lg:w-64 lg:bg-gray-800 lg:flex-none">
          {/* Sidebar */}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-none bg-gray-800 py-3">
            {/* App Logo and Navigation */}
          </div>
          <div className="flex flex-1 flex-col overflow-auto">
            {/* Main Content */}
            {isCreatingGoal && (
              <GoalForm
                onClose={handleCloseGoalForm}
                initialGoalData={{ type: GoalType.weight_loss, targetValue: 0, deadline: new Date() }}
              />
            )}
            {!isCreatingGoal && (
              <>
                <div className="flex-1 flex flex-col gap-4 p-4 overflow-auto">
                  {goalsLoading ? (
                    <p className="text-center">Loading goals...</p>
                  ) : (
                    <>
                      {goals.length > 0 && (
                        <GoalList goals={goals} onGoalSelect={handleGoalSelect} />
                      )}
                      {goals.length === 0 && (
                        <p className="text-center">No goals yet. Create your first goal!</p>
                      )}
                    </>
                  )}
                  {selectedGoal && (
                    <div className="p-4 rounded-md shadow-md bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{selectedGoal.type}</h2>
                        <button onClick={handleCreateGoal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          New Goal
                        </button>
                      </div>
                      <GoalCard goal={selectedGoal} />
                      <div className="mt-6">
                        <ProgressChart goal={selectedGoal} progressData={progressData} />
                        <ProgressLog goal={selectedGoal} progressData={progressData} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-none bg-gray-800 py-3">
                  {/* Footer */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgressPage;