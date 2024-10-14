import { CreateGoalUseCase } from '../../domain/usecases/goals/CreateGoalUseCase';
import { DeleteGoalUseCase } from '../../domain/usecases/goals/DeleteGoalUseCase';
import { GetGoalsUseCase } from '../../domain/usecases/goals/GetGoalsUseCase';
import { UpdateGoalUseCase } from '../../domain/usecases/goals/UpdateGoalUseCase';
import { Goal } from '../../domain/entities/goal/Goal';
import { IGoalRepository } from '../../repositories/goals/IGoalRepository';
import { GoalType } from '../../../../types/goal';

export class GoalService {
  constructor(
    private readonly createGoalUseCase: CreateGoalUseCase,
    private readonly getGoalsUseCase: GetGoalsUseCase,
    private readonly updateGoalUseCase: UpdateGoalUseCase,
    private readonly deleteGoalUseCase: DeleteGoalUseCase
  ) {}

  async createGoal(goalData: { type: GoalType; targetValue: number; deadline: Date; userId: string }): Promise<Goal> {
    return this.createGoalUseCase.execute(goalData);
  }

  async getGoals(userId: string): Promise<Goal[]> {
    return this.getGoalsUseCase.execute(userId);
  }

  async updateGoal(goalId: string, goalData: Partial<Goal>): Promise<void> {
    return this.updateGoalUseCase.execute(goalId, goalData);
  }

  async deleteGoal(goalId: string): Promise<void> {
    return this.deleteGoalUseCase.execute(goalId);
  }
}