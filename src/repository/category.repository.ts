import { Op } from 'sequelize';
import { Category, ICategoryRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository {
    constructor(dbClient: typeof Category) {
      super(dbClient);
    }
  }