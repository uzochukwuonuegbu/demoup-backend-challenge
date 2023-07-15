import { AssetsCategories, IAssetsCategoryRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class AssetsCategoryRepository extends BaseRepository<AssetsCategories> implements IAssetsCategoryRepository {
    constructor(dbClient: typeof AssetsCategories) {
      super(dbClient);
    }

    public async findCategoriesByAssetId(id: string): Promise<AssetsCategories[] | null> {
      return this.dbClient.findAll({ where: { assetId: id } });
    }

    public async findAssetsByCategoryId(id: string): Promise<AssetsCategories[] | null> {
        return this.dbClient.findAll({ where: { categoryId: id } });
      }
  }