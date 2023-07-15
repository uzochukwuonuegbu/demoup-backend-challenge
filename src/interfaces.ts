import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Model } from 'sequelize';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface IAssetController {
  createAsset(): ExpressRouteFunc;
  getAssetById(): ExpressRouteFunc;
  updateAsset(): ExpressRouteFunc;
  deleteAsset(): ExpressRouteFunc;
}

export interface IAssetService {
  createAsset(name: string, type: string, collectionId: string, categoryIds: string[]): Promise<Asset>;
  getAssetById(id: string): Promise<Asset>;
  getAssetsByCategoryId(categoryId: string): Promise<Asset[] | null>;
  getAssetsByCollectionId(categoryId: string): Promise<Asset[] | null>;
  updateAsset(id: string, data: any): Promise<void>;
  deleteAsset(id: string): Promise<void>;
}

export interface IAssetRepository {
  create(assetData: any): Promise<Asset>;
  findById(id: string): Promise<Asset | null>;
  find(query?: any): Promise<Asset | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Asset[]>;
  findByAssetsCategory(id: string): Promise<Asset[]>;
  findByAssetsCollection(d: string): Promise<Asset[]>;
}

// Models
interface AssetAttributes {
  id: string;
  title: string;
  type: string;
  fileFormat: string;
  size: string;
  description: string;
  collectionId: string;
}

interface AssetsCategoriesAttributes {
  id: string;
  assetId: string;
  categoryId: string;
}

interface CategoryAttributes {
  id: string;
  name: string;
  description: string;
}

interface CollectionAttributes {
  id: string;
  name: string;
  description: string;
}


interface CollectionCategoriesAttributes {
  id: string;
  collectionId: string;
  categoryId: string;
}

export class Asset extends Model<AssetAttributes> implements AssetAttributes {
  public id!: string;
  public title!: string;
  public type!: string;
  public collectionId!: string;
  public fileFormat!: string;
  public size!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class AssetsCategories extends Model<AssetsCategoriesAttributes> implements AssetsCategoriesAttributes {
  public id!: string;
  public assetId!: string;
  public categoryId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: string;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class Collection extends Model<CollectionAttributes> implements CollectionAttributes {
  public id!: string;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class CollectionCategories extends Model<CollectionCategoriesAttributes> implements CollectionCategoriesAttributes {
  public id!: string;
  public collectionId!: string;
  public categoryId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}