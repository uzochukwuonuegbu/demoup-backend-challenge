import { UUIDV4 } from 'sequelize';
import sequelize from '../../sequelize.orm';
import { CollectionCategories } from '../interfaces';

CollectionCategories.init(
  {
    id: {
      type: UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    collection_id: {
      type: UUIDV4,
      allowNull: false,
    },
    category_id: {
      type: UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'collections_categories',
    timestamps: false,
  }
);

export default CollectionCategories;