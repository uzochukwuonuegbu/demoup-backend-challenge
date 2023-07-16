import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Model } from 'sequelize';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface IAssetController {
  createAsset(): ExpressRouteFunc;
  getAssets(): ExpressRouteFunc;
  getAssetById(): ExpressRouteFunc;
  updateAsset(): ExpressRouteFunc;
  deleteAsset(): ExpressRouteFunc;
}

export interface IAssetService {
  createAsset(name: string, type: string, collectionId: string, categoryIds: string[]): Promise<Asset>;
  getAssets(filter: any): Promise<Asset[]>;
  getAssetById(id: string): Promise<Asset>;
  getAssetsByCategoryId(categoryId: string): Promise<AssetsCategories[] | null>;
  getAssetsByCollectionId(categoryId: string): Promise<Asset[] | null>;
  updateAsset(id: string, data: any): Promise<void>;
  deleteAsset(id: string): Promise<void>;
}

export interface ICategoryService {
  createCategory(name: string, type: string, collectionId: string, categoryIds: string[]): Promise<Category>;
  getCategoryById(id: string): Promise<Category>;
  getCategoriesByAssetId(assetId: string): Promise<AssetsCategories[] | null>;
  getCategoriesByCollectionId(categoryId: string): Promise<CollectionCategories[] | null>;
  updateCategory(id: string, data: any): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}

export interface ICollectionService {
  createCollection(name: string, type: string, collectionId: string, categoryIds: string[]): Promise<Category>;
  getCollectionById(id: string): Promise<Category>;
  updateCollection(id: string, data: any): Promise<void>;
  deleteCollection(id: string): Promise<void>;
}

export interface IAssetRepository {
  create(assetData: any): Promise<Asset>;
  findById(id: string): Promise<Asset | null>;
  find(query?: any): Promise<Asset | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Asset[]>;
  findByAssetsCollectionId(id: string): Promise<Asset[]>;
}

export interface ICategoryRepository {
  create(data: any): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  find(query?: any): Promise<Category | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Category[]>;
}

export interface IAssetsCategoryRepository {
  create(data: any): Promise<AssetsCategories>;
  find(query?: any): Promise<AssetsCategories | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<AssetsCategories[]>;
  findCategoriesByAssetId(id: string): Promise<AssetsCategories[]>;
  findAssetsByCategoryId(id: string): Promise<AssetsCategories[]>;
}

export interface ICollectionRepository {
  create(data: any): Promise<Collection>;
  findById(id: string): Promise<Collection | null>;
  find(query?: any): Promise<Collection | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Collection[]>;
}

export interface ICollectionCategoryRepository {
  create(data: any): Promise<CollectionCategories>;
  find(query?: any): Promise<CollectionCategories | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<CollectionCategories[]>;
  findCategoriesByCollectionId(id: string): Promise<CollectionCategories[]>;
  findCollectionsByCategoryId(id: string): Promise<CollectionCategories[]>;
}

// Models
interface AssetAttributes {
  id: string;
  title: string;
  file_format: string;
  size: string;
  description: string;
  collection_id: string;
}

interface AssetsCategoriesAttributes {
  id: string;
  asset_id: string;
  category_id: string;
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
  collection_id: string;
  category_id: string;
}

export class Asset extends Model<AssetAttributes> implements AssetAttributes {
  public id!: string;
  public title!: string;
  public collection_id!: string;
  public file_format!: string;
  public size!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class AssetsCategories extends Model<AssetsCategoriesAttributes> implements AssetsCategoriesAttributes {
  public id!: string;
  public asset_id!: string;
  public category_id!: string;

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
  public collection_id!: string;
  public category_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}