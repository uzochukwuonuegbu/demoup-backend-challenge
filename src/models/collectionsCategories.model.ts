import { DataTypes } from 'sequelize';
import sequelize from '../../sequelize.orm';
import { CollectionCategories } from '../interfaces';

CollectionCategories.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    collectionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'collections_categories',
  }
);

export default CollectionCategories;