import { NextFunction, Request, Response } from "express-serve-static-core";
import { ExpressRouteFunc, IAuthController, IAuthService } from "../interfaces";
import { loginSchema, registerSchema } from "./validators/asset.validator";

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) {
    }

    public register(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = registerSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    res.status(400).json({ message: errorMessage });
                }
                const { email, password } = value;
                const token = await this.authService.register(email, password);
                res.status(201).json({ token, status: 201, message: 'success' });
            } catch (err) {
                next(err);
            }
        }
    }

    public login(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = loginSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    res.status(400).json({ message: errorMessage });
                }
                const { email, password } = value;
                const token = await this.authService.login(email, password);
                res.status(200).json({ token, status: 201, message: 'success' });
            } catch (err) {
                next(err);
            }
        }
    }
}