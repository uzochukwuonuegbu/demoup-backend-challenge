import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IAssetController, IAssetService } from "../interfaces";
import logger from '../log.service';
import { createAssetSchema } from "./validators/asset.validator";

export class AssetController implements IAssetController {
    constructor(private assetService: IAssetService) {
    }

    public createAsset(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = createAssetSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    res.status(400).json({ message: errorMessage });
                }
                const result = await this.assetService.createAsset(value);
                res.status(201).json({ status: 201, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to create assets', {error: err})
                next(err);
            }
        }
    }

    public getAssets(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // add query builder
                const result = await this.assetService.getAssets({});
                res.status(200).json({ status: 200, message: 'success', data: result });
            } catch (err) {
                logger.errorLog('Unable to get assets', {error: err})
                next(err);
            }
        }
    }

    public getAssetById(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.assetService.getAssetById(req.params.id);
                if (result) {
                  res.status(200).json({ status: 200, message: 'success', data: result });
                } else {
                  res.status(404).json({ message: 'Asset with this ID not found' });
                }
              } catch (err) {
                logger.errorLog('Unable to get asset by id', {error: err})
                next(err);
              }
        }
    }

    public deleteAsset(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.assetService.deleteAsset(req.params.id);
                res.status(200).json({ status: 200, message: 'Asset deleted' });
              } catch (err) {
                logger.errorLog('Unable to delete asset', {error: err})
                next(err);
              }
        }
    }
}