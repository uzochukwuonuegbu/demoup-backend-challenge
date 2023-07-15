import { CollectionCategories, IAssetsCategoryRepository, ICollectionCategoryRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class CollectionCategoryRepository extends BaseRepository<CollectionCategories> implements ICollectionCategoryRepository {
    constructor(dbClient: typeof CollectionCategories) {
      super(dbClient);
    }

    public async findACollectionsByCategoryId(id: string): Promise<CollectionCategories[] | null> {
      return this.dbClient.findAll({ where: { categoryId: id } });
    }

    public async findCategoriesByCollectionId(id: string): Promise<CollectionCategories[] | null> {
        return this.dbClient.findAll({ where: { collectionId: id } });
      }
  }