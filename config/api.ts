import { Router } from 'express';
import { GoalController } from '../../core/application/controllers/GoalController';
import { authenticate } from '../../infrastructure/adapters/api/middlewares/authenticate';

const router = Router();

const goalController = new GoalController();

// Create a new goal
router.post('/', authenticate, async (req, res) => {
  try {
    const goalData = req.body;
    const createdGoal = await goalController.createGoal(goalData);
    res.status(201).json(createdGoal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
});

// Get all goals for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await goalController.getGoals(userId);
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error getting goals:', error);
    res.status(500).json({ error: 'Failed to retrieve goals' });
  }
});

// Get a specific goal
router.get('/:id', authenticate, async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await goalController.getGoalById(goalId);
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).json({ error: 'Goal not found' });
    }
  } catch (error) {
    console.error('Error getting goal:', error);
    res.status(500).json({ error: 'Failed to retrieve goal' });
  }
});

// Update a goal
router.put('/:id', authenticate, async (req, res) => {
  try {
    const goalId = req.params.id;
    const goalData = req.body;
    await goalController.updateGoal(goalId, goalData);
    res.status(204).send();
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

// Delete a goal
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const goalId = req.params.id;
    await goalController.deleteGoal(goalId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ error: 'Failed to delete goal' });
  }
});

export default router;