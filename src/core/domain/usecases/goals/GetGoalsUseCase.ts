import { IGoalRepository } from '../../repositories/goals/IGoalRepository';
import { Goal } from '../../entities/goal/Goal';

export class GetGoalsUseCase {
  constructor(private readonly goalRepository: IGoalRepository) {}

  async execute(userId: string): Promise<Goal[]> {
    try {
      const goals = await this.goalRepository.findAllByUserId(userId);
      return goals;
    } catch (error) {
      console.error('Error getting goals:', error);
      throw error;
    }
  }
}