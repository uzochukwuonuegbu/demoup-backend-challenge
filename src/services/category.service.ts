import { IAssetsCategoryRepository, AssetsCategories, ICategoryRepository, ICategoryService, Category, ICollectionCategoryRepository, CollectionCategories } from "../interfaces";

export class CategoryService implements ICategoryService {
  constructor(private categoryRepository: ICategoryRepository, private readonly assetCategoryRepository: IAssetsCategoryRepository, private readonly collectionsCategoryRepository: ICollectionCategoryRepository) {}

  public async createCategory(data: any): Promise<Category> {
    const res = await this.categoryRepository.create(data);
    return res as Category;
  }

    public async getCategoryById(id: string): Promise<Category> {
      return this.categoryRepository.findById(id);
    }

    public async getCategoriesByAssetId(id: string): Promise<AssetsCategories[]> {
      return this.assetCategoryRepository.findCategoriesByAssetId(id);
    }

    public async getCategoriesByCollectionId(id: string): Promise<CollectionCategories[]> {
        return this.collectionsCategoryRepository.findCategoriesByCollectionId(id);
      }

    public async updateCategory(id: string, data: any): Promise<void> {
        await this.categoryRepository.update(id, data);
    }

    public async deleteCategory(id: string): Promise<void> {
      await this.categoryRepository.delete(id);
  }
}