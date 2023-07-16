import { Auth, IAuthRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export class AuthRepository extends BaseRepository<Auth> implements IAuthRepository {
    constructor(dbClient: any) {
      super(dbClient);
    }

    public async findByEmail(email: string): Promise<Auth | null> {
      const users = await this.dbClient.findAll({ where: { email } });
      return users[0] || null;
    }
  }