import { Op } from 'sequelize';
import { Collection, ICollectionRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class CollectionRepository extends BaseRepository<Collection> implements ICollectionRepository {
    constructor(dbClient: typeof Collection) {
      super(dbClient);
    }
  }