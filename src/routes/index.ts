import { Router } from 'express';
import assetRoutes from './asset.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use(
  assetRoutes,
  authRoutes
);

export default router;