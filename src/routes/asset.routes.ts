import { Router } from "express";
import { getAssetController } from "../dependency-injection";

const ctrl = getAssetController();

const router = Router({
  mergeParams: true
});

const routes = {
  createAsset: "/asset",
  getAssetById: "/asset/:id",
  updateAsset: "/asset/:id",
  deleteAsset: "/asset/:id",
};

router.post(
    routes.createAsset,
    ctrl.createAsset()
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