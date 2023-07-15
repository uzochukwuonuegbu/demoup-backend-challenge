import { AssetController } from "./controllers/asset.controller";
import { Asset, AssetsCategories, Category, Collection, CollectionCategories, IAssetController, IAssetRepository, IAssetsCategoryRepository, IAssetService, ICategoryRepository, ICategoryService, ICollectionCategoryRepository, ICollectionRepository, ICollectionService } from "./interfaces";
import { AssetRepository } from "./repository/asset.repository";
import { AssetsCategoryRepository } from "./repository/assetsCategories.repository";
import { CategoryRepository } from "./repository/category.repository";
import { CollectionRepository } from "./repository/collections.repository";
import { CollectionCategoryRepository } from "./repository/collectionsCategories.repository";
import { AssetService } from "./services/asset.service";
import { CategoryService } from "./services/category.service";
import { CollectionService } from "./services/collections.service";

export function getAssetController(): IAssetController {
    return new AssetController(getAssetService());
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
