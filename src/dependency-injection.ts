import { AssetController } from "./controllers/asset.controller";
import { Asset, IAssetController, IAssetRepository, IAssetService } from "./interfaces";
import { AssetRepository } from "./repository/asset.repository";
import { AssetService } from "./services/asset.service";

export function getAssetController(): IAssetController {
    return new AssetController(getAssetService());
}

export function getAssetService(): IAssetService {
    return new AssetService(getAssetRepository());
}

export function getAssetRepository(): IAssetRepository {
    return new AssetRepository(Asset);
}
