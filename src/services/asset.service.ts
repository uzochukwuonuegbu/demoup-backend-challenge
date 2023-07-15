import { IAssetService, IAssetRepository, Asset } from "../interfaces";

export class AssetService implements IAssetService {
  constructor(private assetRepository: IAssetRepository) {}

  public async createAsset(name: string, color: string): Promise<Asset> {
    // const type = await this.assetRepository.create({
    //   name,
    //   color,
    // });

    return {} as Asset;
  }

    public async getAssetById(id: string): Promise<Asset> {
      return this.assetRepository.findById(id);
    }

    public async getAssetsByCategoryId(id: string): Promise<Asset[]> {
      return this.assetRepository.findByAssetsCategory(id);
    }

    public async getAssetsByCollectionId(id: string): Promise<Asset[]> {
        return this.assetRepository.findByAssetsCollection(id);
      }

    public async updateAsset(id: string, data: any): Promise<void> {
        await this.assetRepository.update(id, data);
    }

    public async deleteAsset(id: string): Promise<void> {
      await this.assetRepository.delete(id);
  }
}