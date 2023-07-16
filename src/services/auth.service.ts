import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError, RecordExistsError, UnauthorizedError } from "../controllers/errorHandler/httpError";
import { IAuthRepository, IAuthService } from "../interfaces";

const JWT_SECRET = 'asdfghjkl';

export class AuthService implements IAuthService {
  constructor(private authRepository: IAuthRepository) {}

    public async login(email: string, password: string): Promise<{ token: string }> {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
          throw new NotFoundError('No user with email found');
        }

        const isPasswordmatch = await bcryptjs.compare(password, user.password);

        if (!isPasswordmatch) {
            throw new UnauthorizedError('Wrong credentials');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;
    }

    public async register(email: string, password: string): Promise<{ token: string }> {
        try {
            const existingUser = await this.authRepository.findByEmail(email);
            if (existingUser) {
                throw new RecordExistsError('User already exists');
            }
            const hashedPassword = await bcryptjs.hash(password, 10);
            const user = await this.authRepository.create({ email, password: hashedPassword });
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
            return token
        } catch (error) {
          // log error
          console.log({ error });
          throw new BadRequestError('Unable to register user')
        }
    }
}