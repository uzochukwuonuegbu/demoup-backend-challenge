import { AuthController } from '../../../src/controllers/auth.controller';
import { IAuthService } from '../../../src/interfaces';
import { registerSchema, loginSchema } from '../../../src/controllers/validators/auth.validator';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: IAuthService;
  let mockRequest: any;
  let mockResponse: any;
  let mockNextFunction: any;

  beforeEach(() => {
    authService = {} as IAuthService; // Mock the auth service
    authController = new AuthController(authService);
    mockRequest = { body: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNextFunction = jest.fn();
  });

  describe('register', () => {
    it('should return 201 status code and token when registration is successful', async () => {
      const mockToken = 'mockToken';
      authService.register = jest.fn().mockResolvedValue(mockToken);
      mockRequest.body = { email: 'test@example.com', password: 'password' };

      await authController.register()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: mockToken,
        status: 201,
        message: 'success',
      });
      expect(authService.register).toHaveBeenCalledWith(
        mockRequest.body.email,
        mockRequest.body.password
      );
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should return 400 status code and error message when registration validation fails', async () => {
      const mockValidationError = { details: [{ message: 'Invalid email' }] };
      registerSchema.validate = jest.fn().mockReturnValue({ error: mockValidationError });
      mockRequest.body = { email: 'invalid', password: 'password' };

      await authController.register()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockValidationError.details[0].message,
      });
    });
  });

  describe('login', () => {
    it('should return 200 status code and token when login is successful', async () => {
      const mockToken = 'mockToken';
      authService.login = jest.fn().mockResolvedValue(mockToken);
      mockRequest.body = { email: 'test@example.com', password: 'password' };
      loginSchema.validate = jest.fn().mockReturnValue({ value: mockRequest.body });

      await authController.login()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: mockToken,
        status: 201,
        message: 'success',
      });
      expect(authService.login).toHaveBeenCalledWith(
        mockRequest.body.email,
        mockRequest.body.password
      );
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should return 400 status code and error message when login validation fails', async () => {
      const mockValidationError = { details: [{ message: 'Invalid email' }] };
      loginSchema.validate = jest.fn().mockReturnValue({ error: mockValidationError });
      mockRequest.body = { email: 'invalid', password: 'password' };

      await authController.login()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockValidationError.details[0].message,
      });
    });
  });
});