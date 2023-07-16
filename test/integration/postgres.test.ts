import { Sequelize } from 'sequelize';
import { Auth } from '../../src/models';

describe('PostgreSQL integration test', () => {
    const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/postgres', {
      dialect: 'postgres',
      logging: false,
    });
  
    beforeAll(async () => {
      await sequelize.authenticate();
    });
  
    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    describe('Auth model', () => {
      it('should be able to create a new Asset', async () => {
        const auth = await Auth.findAll({});
  
        expect(auth).toBeTruthy();
      });
    });
  });