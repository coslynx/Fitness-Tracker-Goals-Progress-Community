import { IGoalRepository } from '../../repositories/goals/IGoalRepository';

export class DeleteGoalUseCase {
  constructor(private readonly goalRepository: IGoalRepository) {}

  async execute(goalId: string): Promise<void> {
    await this.goalRepository.delete(goalId);
  }
}