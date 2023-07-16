import { Asset, IAssetRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class AssetRepository extends BaseRepository<Asset> implements IAssetRepository {
    constructor(dbClient: any) {
      super(dbClient);
    }

    public async create(data: any): Promise<Asset | null> {
      const asset = {
        ...data,
        collection_id: data.collectionId,
      }
      return this.dbClient.create(asset);
    }

    public async findByAssetsCollectionId(id: string): Promise<Asset[] | null> {
      return this.dbClient.findAll({ where: { collection_id: id } });
    }
  }