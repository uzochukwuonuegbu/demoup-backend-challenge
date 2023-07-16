import { AssetController } from "./controllers/asset.controller";
import { AuthController } from "./controllers/auth.controller";
import { IAssetController, IAssetRepository, IAssetsCategoryRepository, IAssetService, IAuthController, IAuthRepository, IAuthService, ICategoryRepository, ICategoryService, ICollectionCategoryRepository, ICollectionRepository, ICollectionService } from "./interfaces";
import { Asset, AssetsCategories, Auth, Category, Collection, CollectionCategories } from './models';
import { AssetRepository } from "./repository/asset.repository";
import { AssetsCategoryRepository } from "./repository/assetsCategories.repository";
import { AuthRepository } from "./repository/auth.repository";
import { CategoryRepository } from "./repository/category.repository";
import { CollectionRepository } from "./repository/collections.repository";
import { CollectionCategoryRepository } from "./repository/collectionsCategories.repository";
import { AssetService } from "./services/asset.service";
import { AuthService } from "./services/auth.service";
import { CategoryService } from "./services/category.service";
import { CollectionService } from "./services/collections.service";

export function getAssetController(): IAssetController {
    return new AssetController(getAssetService());
}

export function getAuthController(): IAuthController {
    return new AuthController(getAuthService());
}

export function getAuthService(): IAuthService {
    return new AuthService(getAuthRepository());
}

export function getAssetService(): IAssetService {
    return new AssetService(getAssetRepository(), getAssetCategoryRepository());
}

export function getCategoryService(): ICategoryService {
    return new CategoryService(getCategoryRepository(), getAssetCategoryRepository(), getCollectionCategoryRepository());
}

export function getCollectionService(): ICollectionService {
    return new CollectionService(getCategoryRepository(), getCollectionCategoryRepository());
}

export function getAssetRepository(): IAssetRepository {
    return new AssetRepository(Asset);
}

export function getAuthRepository(): IAuthRepository {
    return new AuthRepository(Auth);
}

export function getCategoryRepository(): ICategoryRepository {
    return new CategoryRepository(Category);
}

export function getAssetCategoryRepository(): IAssetsCategoryRepository {
    return new AssetsCategoryRepository(AssetsCategories);
}

export function getCollectionRepository(): ICollectionRepository {
    return new CollectionRepository(Collection);
}

export function getCollectionCategoryRepository(): ICollectionCategoryRepository {
    return new CollectionCategoryRepository(CollectionCategories);
}
