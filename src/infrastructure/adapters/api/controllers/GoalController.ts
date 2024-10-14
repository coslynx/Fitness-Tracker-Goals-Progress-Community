import { Request, Response } from 'express';
import { GoalService } from '../../../../core/application/services/goalService';
import { GoalMapper } from '../../../../infrastructure/gateways/api/GoalMapper';

export class GoalController {
  constructor(private readonly goalService: GoalService, private readonly goalMapper: GoalMapper) {}

  async createGoal(req: Request, res: Response) {
    try {
      const goalData = req.body;
      const createdGoal = await this.goalService.createGoal(goalData);
      const responseGoal = this.goalMapper.toApiResponse(createdGoal);
      res.status(201).json(responseGoal);
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ error: 'Failed to create goal' });
    }
  }

  async getGoals(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const goals = await this.goalService.getGoals(userId);
      const responseGoals = goals.map((goal) => this.goalMapper.toApiResponse(goal));
      res.status(200).json(responseGoals);
    } catch (error) {
      console.error('Error getting goals:', error);
      res.status(500).json({ error: 'Failed to retrieve goals' });
    }
  }

  async updateGoal(req: Request, res: Response) {
    try {
      const goalId = req.params.id;
      const goalData = req.body;
      await this.goalService.updateGoal(goalId, goalData);
      res.status(204).send();
    } catch (error) {
      console.error('Error updating goal:', error);
      res.status(500).json({ error: 'Failed to update goal' });
    }
  }

  async deleteGoal(req: Request, res: Response) {
    try {
      const goalId = req.params.id;
      await this.goalService.deleteGoal(goalId);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting goal:', error);
      res.status(500).json({ error: 'Failed to delete goal' });
    }
  }
}