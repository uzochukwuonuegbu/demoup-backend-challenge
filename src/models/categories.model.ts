import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../sequelize.orm';
import { Category } from '../interfaces';

Category.init(
  {
    id: {
      type: UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
  }
);

export default Category;