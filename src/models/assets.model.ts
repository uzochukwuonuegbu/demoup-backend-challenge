import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../sequelize.orm';
import { Asset } from '../interfaces';

Asset.init(
    {
        id: {
            type: UUIDV4,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          file_format: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          size: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          collection_id: {
            type: UUIDV4,
            allowNull: false,
          },
      },
      {
        sequelize,
        tableName: 'assets',
        timestamps: false,
      }
  );

export default Asset;