import { PrismaClient, Goal as PrismaGoal } from '@prisma/client';
import { Goal } from '../../../../core/domain/entities/goal/Goal';
import { IGoalRepository } from '../../../../core/domain/repositories/goals/IGoalRepository';
import prisma from '../../../../infrastructure/adapters/database/prisma/prisma';

export class GoalRepository implements IGoalRepository {
  async save(goal: Goal): Promise<Goal> {
    try {
      const prismaGoal: PrismaGoal = {
        userId: goal.userId,
        type: goal.type,
        targetValue: goal.targetValue,
        deadline: goal.deadline,
        progress: goal.progress,
      };

      const createdGoal = await prisma.goal.create({
        data: prismaGoal,
      });

      return {
        id: createdGoal.id,
        userId: createdGoal.userId,
        type: createdGoal.type,
        targetValue: createdGoal.targetValue,
        deadline: createdGoal.deadline,
        progress: createdGoal.progress,
        createdAt: createdGoal.createdAt,
        updatedAt: createdGoal.updatedAt,
      };
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  }

  async findAllByUserId(userId: string): Promise<Goal[]> {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId,
        },
      });

      return goals.map((prismaGoal) => ({
        id: prismaGoal.id,
        userId: prismaGoal.userId,
        type: prismaGoal.type,
        targetValue: prismaGoal.targetValue,
        deadline: prismaGoal.deadline,
        progress: prismaGoal.progress,
        createdAt: prismaGoal.createdAt,
        updatedAt: prismaGoal.updatedAt,
      }));
    } catch (error) {
      console.error('Error finding goals by user ID:', error);
      throw error;
    }
  }

  async findById(goalId: string): Promise<Goal | null> {
    try {
      const goal = await prisma.goal.findUnique({
        where: {
          id: goalId,
        },
      });

      if (!goal) {
        return null;
      }

      return {
        id: goal.id,
        userId: goal.userId,
        type: goal.type,
        targetValue: goal.targetValue,
        deadline: goal.deadline,
        progress: goal.progress,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt,
      };
    } catch (error) {
      console.error('Error finding goal by ID:', error);
      throw error;
    }
  }

  async update(goal: Goal): Promise<void> {
    try {
      const prismaGoal: PrismaGoal = {
        userId: goal.userId,
        type: goal.type,
        targetValue: goal.targetValue,
        deadline: goal.deadline,
        progress: goal.progress,
      };

      await prisma.goal.update({
        where: {
          id: goal.id,
        },
        data: prismaGoal,
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  async delete(goalId: string): Promise<void> {
    try {
      await prisma.goal.delete({
        where: {
          id: goalId,
        },
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }
}