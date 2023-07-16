import { Category, Collection, CollectionCategories, ICollectionCategoryRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class CollectionCategoryRepository extends BaseRepository<CollectionCategories> implements ICollectionCategoryRepository {
    constructor(dbClient: typeof CollectionCategories) {
      super(dbClient);
    }

    public async findCollectionsByCategoryId(id: string): Promise<CollectionCategories[] | null> {
      return this.dbClient.findAll({ where: { category_id: id }, include: Collection });
    }

    public async findCategoriesByCollectionId(id: string): Promise<CollectionCategories[] | null> {
        return this.dbClient.findAll({ where: { collection_id: id }, include: Category });
      }
  }