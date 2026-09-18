import { Router } from 'express';
import type { Model } from 'mongoose';

type ResourceItem = Record<string, unknown>;

function createCollectionRouter(model: Model<ResourceItem>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const items = await model.find().lean();
      response.json(items);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    const item = request.body as ResourceItem;

    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      response.status(400).json({ error: 'Request body must be a JSON object' });
      return;
    }

    try {
      const createdItem = await model.create(item);
      response.status(201).json(createdItem);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export function createApiRouters(models: {
  User: Model<ResourceItem>;
  Team: Model<ResourceItem>;
  Activity: Model<ResourceItem>;
  Leaderboard: Model<ResourceItem>;
  Workout: Model<ResourceItem>;
}) {
  return {
    usersRouter: createCollectionRouter(models.User),
    teamsRouter: createCollectionRouter(models.Team),
    activitiesRouter: createCollectionRouter(models.Activity),
    leaderboardRouter: createCollectionRouter(models.Leaderboard),
    workoutsRouter: createCollectionRouter(models.Workout),
  };
}
