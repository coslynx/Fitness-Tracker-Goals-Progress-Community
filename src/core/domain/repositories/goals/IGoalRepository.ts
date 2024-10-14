import { Goal } from '../../entities/goal/Goal';

export interface IGoalRepository {
  save(goal: Goal): Promise<Goal>;
  findAllByUserId(userId: string): Promise<Goal[]>;
  findById(goalId: string): Promise<Goal | null>;
  update(goal: Goal): Promise<void>;
  delete(goalId: string): Promise<void>;
}