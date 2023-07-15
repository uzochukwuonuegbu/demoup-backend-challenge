import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IAssetController, IAssetService } from "../interfaces";
// import { InvalidRequestInputError, NotFoundError, RecordExistsError } from "./errorHandler/httpError";
// import { createTypeSchema } from "./validators/type.validator";

export class AssetController implements IAssetController {
    constructor(private assetService: IAssetService) {
    }

    public createAsset(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const { error, value } = createTypeSchema.validate(req.body);
                // if (error) {
                //     const errorMessage = error.details[0].message;
                //     throw new InvalidRequestInputError(errorMessage);
                // }

                // const { name, color } = value;
                const result = await this.assetService.createAsset('name', 'type', 'collectionId', ['categoryId-1']);
                res.status(201).json({ status: 201, message: 'success', data: result });
            } catch (err) {
                next(err);
            }
        }
    }

    public getAssets(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const { error, value } = createTypeSchema.validate(req.body);
                // if (error) {
                //     const errorMessage = error.details[0].message;
                //     throw new InvalidRequestInputError(errorMessage);
                // }

                // const { name, color } = value;
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
                //   throw new NotFoundError();
                }
              } catch (err) {
                next(err);
              }
        }
    }

    public updateAsset(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const { error, value } = createTypeSchema.validate(req.body);
                // if (error) {
                //     const errorMessage = error.details[0].message;
                //     throw new InvalidRequestInputError(errorMessage);
                // }
                await this.assetService.updateAsset(req.params.id, {});
                res.status(200).json({ status: 200, message: 'success', data: { id: req.params.id } });
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