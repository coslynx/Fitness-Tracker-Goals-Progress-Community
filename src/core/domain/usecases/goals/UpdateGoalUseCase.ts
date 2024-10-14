import { IGoalRepository } from '../../repositories/goals/IGoalRepository';
import { Goal } from '../../entities/goal/Goal';
import { validateGoalData } from '../../../../lib/utils/validators';

export class UpdateGoalUseCase {
  constructor(private readonly goalRepository: IGoalRepository) {}

  async execute(goalId: string, goalData: Partial<Goal>): Promise<void> {
    try {
      // 1. Validate goal data
      const isValidGoalData = validateGoalData(goalData);
      if (!isValidGoalData) {
        throw new Error('Invalid goal data provided.');
      }
      // 2. Fetch existing goal from the repository
      const goal = await this.goalRepository.findById(goalId);
      if (!goal) {
        throw new Error(`Goal with ID ${goalId} not found.`);
      }
      // 3. Update the goal with the validated data
      const updatedGoal = Object.assign(goal, goalData);
      await this.goalRepository.update(updatedGoal);
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }
}