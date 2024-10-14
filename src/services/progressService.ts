import { ProgressEntry } from '../../domain/entities/progress/ProgressEntry';
import { IProgressRepository } from '../../repositories/progress/IProgressRepository';
import { Goal } from '../../domain/entities/goal/Goal';
import { LogProgressUseCase } from '../../domain/usecases/progress/LogProgressUseCase';
import { GetProgressEntriesUseCase } from '../../domain/usecases/progress/GetProgressEntriesUseCase';
import { calculateProgressPercentage, calculateAverageProgressPerDay } from '../../../../lib/utils/calculations';

export class ProgressService {
  constructor(
    private readonly logProgressUseCase: LogProgressUseCase,
    private readonly getProgressEntriesUseCase: GetProgressEntriesUseCase,
  ) {}

  async logProgress(progressData: { goalId: string; value: number; date: Date }): Promise<void> {
    return this.logProgressUseCase.execute(progressData);
  }

  async getProgressEntries(userId: string, goalId?: string): Promise<ProgressEntry[]> {
    if (goalId) {
      return this.getProgressEntriesUseCase.execute(userId, goalId);
    }
    return this.getProgressEntriesUseCase.execute(userId);
  }

  async getProgressForGoal(goal: Goal, progressEntries: ProgressEntry[]): Promise<{ progress: number; averageProgressPerDay: number }> {
    const progress = calculateProgressPercentage(goal, progressEntries);
    const averageProgressPerDay = calculateAverageProgressPerDay(goal, progressEntries);
    return { progress, averageProgressPerDay };
  }
}