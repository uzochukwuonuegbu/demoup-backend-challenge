import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IAssetController, IAssetService } from "../interfaces";
import { InvalidRequestInputError, NotFoundError } from "./errorHandler/httpError";
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
                next(err);
              }
        }
    }
}