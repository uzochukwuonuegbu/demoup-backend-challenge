import { Asset, AssetsCategories, Category, IAssetsCategoryRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class AssetsCategoryRepository extends BaseRepository<AssetsCategories> implements IAssetsCategoryRepository {
    constructor(dbClient: typeof AssetsCategories) {
      super(dbClient);
    }

    public async findCategoriesByAssetId(id: string): Promise<AssetsCategories[] | null> {
      return this.dbClient.findAll({ where: { asset_id: id }, include: Category });
    }

    public async findAssetsByCategoryId(id: string): Promise<AssetsCategories[] | null> {
        return this.dbClient.findAll({ where: { category_id: id }, include: Asset });
      }
  }