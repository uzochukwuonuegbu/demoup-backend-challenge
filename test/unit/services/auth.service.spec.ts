import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../../src/controllers/errorHandler/httpError';
import { IAuthRepository } from '../../../src/interfaces';
import { AuthService } from '../../../src/services/auth.service';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockJwtSecret = 'asdfghjkl';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: IAuthRepository;

  beforeEach(() => {
    authRepository = {} as IAuthRepository; // Mock the auth repository
    authService = new AuthService(authRepository);
  });

  describe('login', () => {
    it('should return a token when login is successful', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'password';
      const mockUser = { id: '1', email: mockEmail, password: 'hashedPassword' };
      const mockToken = 'mockToken';

      authRepository.findByEmail = jest.fn().mockResolvedValue(mockUser);
      bcryptjs.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(mockToken);

      await expect(authService.login(mockEmail, mockPassword)).resolves.toEqual(mockToken);

      expect(authRepository.findByEmail).toHaveBeenCalledWith(mockEmail);
      expect(bcryptjs.compare).toHaveBeenCalledWith(mockPassword, mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email }, mockJwtSecret);
    });

    it('should throw NotFoundError when no user with email is found', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'password';

      authRepository.findByEmail = jest.fn().mockResolvedValue(null);

      await expect(authService.login(mockEmail, mockPassword)).rejects.toThrow(NotFoundError);

      expect(authRepository.findByEmail).toHaveBeenCalledWith(mockEmail);
    });

    it('should throw UnauthorizedError when password is incorrect', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'password';
      const mockUser = { id: '1', email: mockEmail, password: 'hashedPassword' };

      authRepository.findByEmail = jest.fn().mockResolvedValue(mockUser);
      bcryptjs.compare = jest.fn().mockResolvedValue(false);

      await expect(authService.login(mockEmail, mockPassword)).rejects.toThrow(UnauthorizedError);

      expect(authRepository.findByEmail).toHaveBeenCalledWith(mockEmail);
      expect(bcryptjs.compare).toHaveBeenCalledWith(mockPassword, mockUser.password);
    });
  });

  describe('register', () => {
    it('should return a token when registration is successful', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'password';
      const mockUser = { id: '1', email: mockEmail, password: 'hashedPassword' };
      const mockToken = 'mockToken';

      authRepository.findByEmail = jest.fn().mockResolvedValue(null);
      authRepository.create = jest.fn().mockResolvedValue(mockUser);
      bcryptjs.hash = jest.fn().mockResolvedValue('hashedPassword');
      jwt.sign = jest.fn().mockReturnValue(mockToken);

      await expect(authService.register(mockEmail, mockPassword)).resolves.toEqual(mockToken);

      expect(authRepository.findByEmail).toHaveBeenCalledWith(mockEmail);
      expect(authRepository.create).toHaveBeenCalledWith({ email: mockEmail, password: 'hashedPassword' });
      expect(bcryptjs.hash).toHaveBeenCalledWith(mockPassword, 10);
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email }, mockJwtSecret);
    });

    it('should throw RecordExistsError when user already exists', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'password';
      const mockUser = { id: '1', email: mockEmail, password: 'hashedPassword' };

      authRepository.findByEmail = jest.fn().mockResolvedValue(mockUser);

      await expect(authService.register(mockEmail, mockPassword)).rejects.toThrow(BadRequestError);
    });
  });
});