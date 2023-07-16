import { Router } from "express";
import { authenticateToken } from "../controllers/middlewares/auth.middleware";
import { getAssetController } from "../dependency-injection";

const ctrl = getAssetController();

const router = Router({
  mergeParams: true
});

const routes = {
  createAsset: "/assets",
  getAssets: "/assets",
  getAssetById: "/assets/:id",
  deleteAsset: "/assets/:id",
};

router.post(
    routes.createAsset,
    authenticateToken,
    ctrl.createAsset()
);

router.get(
  routes.getAssets,
  authenticateToken,
  ctrl.getAssets()
);

router.get(
  routes.getAssetById,
  authenticateToken,
  ctrl.getAssetById()
);

router.delete(
  routes.deleteAsset,
  authenticateToken,
  ctrl.deleteAsset()
);

export default router;