import { Op } from 'sequelize';
import { IAssetRepository, Asset } from '../interfaces';
import { BaseRepository } from './base.repository';

export class AssetRepository extends BaseRepository<Asset> implements IAssetRepository {
    constructor(dbClient: typeof Asset) {
      super(dbClient);
    }

    // TODO: need to make queries by categoryId not collection
    public async findByAssetsCategory(id: string): Promise<Asset[] | null> {
      return this.dbClient.findAll({ where: { collectionId: id } });
    }
  
    public async findByAssetsCollection(id: string): Promise<Asset[]> {
      return this.dbClient.findAll({ where: { collectionId: { [Op.in]: id } } });
    }
  }