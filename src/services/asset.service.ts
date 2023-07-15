import { Asset, AssetsCategories, IAssetRepository, IAssetsCategoryRepository, IAssetService } from "../interfaces";

export class AssetService implements IAssetService {
  constructor(private assetRepository: IAssetRepository, private readonly assetCategoryRepository: IAssetsCategoryRepository) {}

    public async createAsset(data: any): Promise<Asset> {
        const res = await this.assetRepository.create(data);
        return res as Asset;
    }

    public async getAssets(filter: any): Promise<Asset[]> {
        const res = await this.assetRepository.findAll(filter || {});
        console.log({ res });
        return res as Asset[];
    }

    public async getAssetById(id: string): Promise<Asset> {
      return this.assetRepository.findById(id);
    }

    public async getAssetsByCategoryId(id: string): Promise<AssetsCategories[]> {
      return this.assetCategoryRepository.findAssetsByCategoryId(id);
    }

    public async getAssetsByCollectionId(id: string): Promise<Asset[]> {
        return this.assetRepository.findByAssetsCollectionId(id);
      }

    public async updateAsset(id: string, data: any): Promise<void> {
        await this.assetRepository.update(id, data);
    }

    public async deleteAsset(id: string): Promise<void> {
      await this.assetRepository.delete(id);
  }
}