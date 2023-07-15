import { Router } from "express";
import { getAssetController } from "../dependency-injection";

const ctrl = getAssetController();

const router = Router({
  mergeParams: true
});

const routes = {
  createAsset: "/assets",
  getAssets: "/assets",
  getAssetById: "/assets/:id",
  updateAsset: "/assets/:id",
  deleteAsset: "/assets/:id",
};

router.post(
    routes.createAsset,
    ctrl.createAsset()
);

router.get(
  routes.getAssets,
  ctrl.getAssets()
);

router.get(
  routes.getAssetById,
  ctrl.getAssetById()
);

router.put(
  routes.updateAsset,
  ctrl.updateAsset()
);

router.delete(
  routes.deleteAsset,
  ctrl.deleteAsset()
);

export default router;