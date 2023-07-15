import { Collection, ICollectionCategoryRepository, ICollectionRepository, ICollectionService } from "../interfaces";

export class CollectionService implements ICollectionService {
  constructor(private collectionRepository: ICollectionRepository, private collectionCategoryRepository: ICollectionCategoryRepository) {}

  public async createCollection(data: any): Promise<Collection> {
    const res = await this.collectionRepository.create(data);
    return res as Collection;
  }

    public async getCollectionById(id: string): Promise<Collection> {
      return this.collectionRepository.findById(id);
    }

    public async updateCollection(id: string, data: any): Promise<void> {
        await this.collectionRepository.update(id, data);
    }

    public async deleteCollection(id: string): Promise<void> {
      await this.collectionRepository.delete(id);
  }
}