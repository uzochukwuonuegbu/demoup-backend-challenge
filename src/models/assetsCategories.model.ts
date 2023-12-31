import { UUIDV4 } from 'sequelize';
import sequelize from '../../sequelize.orm';
import { AssetsCategories } from '../interfaces';


AssetsCategories.init(
    {
    id: {
      type: UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    asset_id: {
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
    tableName: 'assets_categories',
    timestamps: false,
  }
);

export default AssetsCategories;