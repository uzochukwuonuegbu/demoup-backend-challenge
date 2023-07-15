import { Router } from 'express';
import assetRoutes from './asset.routes';

const router = Router();

router.use(
  assetRoutes
);

export default router;