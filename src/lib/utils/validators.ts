import { Goal } from '@/core/domain/entities/goal/Goal';
import { GoalType } from '@/types/goal';

/**
 * Validates goal data against defined rules.
 *
 * @param goalData - The goal data to validate.
 * @returns - True if the goal data is valid, false otherwise.
 */
export const validateGoalData = (goalData: { type: GoalType; targetValue: number; deadline: Date; userId: string }): boolean => {
  // 1. Validate Goal Type: Ensure type is one of the allowed GoalType enums.
  if (!Object.values(GoalType).includes(goalData.type)) {
    return false;
  }

  // 2. Validate Target Value: Ensure targetValue is a positive number.
  if (goalData.targetValue <= 0) {
    return false;
  }

  // 3. Validate Deadline: Ensure deadline is a valid date in the future.
  if (goalData.deadline <= new Date()) {
    return false;
  }

  // 4. Validate User ID: Ensure userId is a valid string (optional, if user authentication is implemented).
  if (!goalData.userId || typeof goalData.userId !== 'string') {
    return false;
  }

  // 5. Additional Validation (Optional): Add more validation rules specific to your MVP (e.g., for goal type-specific constraints).

  return true;
};