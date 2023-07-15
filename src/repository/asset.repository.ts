import { Asset, IAssetRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class AssetRepository extends BaseRepository<Asset> implements IAssetRepository {
    constructor(dbClient: any) {
      super(dbClient);
    }

    public async findByAssetsCollectionId(id: string): Promise<Asset[] | null> {
      return this.dbClient.findAll({ where: { collectionId: id } });
    }
  }