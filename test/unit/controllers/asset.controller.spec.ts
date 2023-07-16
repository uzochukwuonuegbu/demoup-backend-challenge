import { createAssetSchema } from '../../../src/controllers/validators/asset.validator';
import { AssetController } from '../../../src/controllers/asset.controller';
import { IAssetService } from '../../../src/interfaces';

describe('AssetController', () => {
  let assetController: AssetController;
  let assetService: IAssetService;
  let mockRequest: any;
  let mockResponse: any;
  let mockNextFunction: any;

  beforeEach(() => {
    assetService = {} as IAssetService; // Mock the asset service
    assetController = new AssetController(assetService);
    mockRequest = { body: {}, params: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNextFunction = jest.fn();
  });

  describe('createAsset', () => {
    it('should return 201 status code and created asset data when validation is successful', async () => {
      const mockCreatedAsset = { id: 1, name: 'Asset 1' };
      assetService.createAsset = jest.fn().mockResolvedValue(mockCreatedAsset);
      mockRequest.body = { name: 'Asset 1' };

      await assetController.createAsset()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 201,
        message: 'success',
        data: mockCreatedAsset,
      });
      expect(assetService.createAsset).toHaveBeenCalledWith(mockRequest.body);
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should return 400 status code and error message when validation fails', async () => {
      const mockValidationError = { details: [{ message: 'Invalid name' }] };
      createAssetSchema.validate = jest.fn().mockReturnValue({ error: mockValidationError });
      mockRequest.body = { name: '' };

      await assetController.createAsset()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockValidationError.details[0].message,
      });
    });

    it('should call the next function with the error when an exception occurs', async () => {
      const mockError = new Error('Something went wrong');
      assetService.createAsset = jest.fn().mockRejectedValue(mockError);

      await assetController.createAsset()(mockRequest, mockResponse, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getAssets', () => {
    it('should return 200 status code and asset data when retrieval is successful', async () => {
      const mockAssets = [{ id: 1, name: 'Asset 1' }, { id: 2, name: 'Asset 2' }];
      assetService.getAssets = jest.fn().mockResolvedValue(mockAssets);

      await assetController.getAssets()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        message: 'success',
        data: mockAssets,
      });
      expect(assetService.getAssets).toHaveBeenCalledWith({});
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should call the next function with the error when an exception occurs', async () => {
      const mockError = new Error('Something went wrong');
      assetService.getAssets = jest.fn().mockRejectedValue(mockError);

      await assetController.getAssets()(mockRequest, mockResponse, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getAssetById', () => {
    it('should return 200 status code and asset data when asset is found', async () => {
      const mockAsset = { id: 1, name: 'Asset 1' };
      assetService.getAssetById = jest.fn().mockResolvedValue(mockAsset);
      mockRequest.params.id = '1';

      await assetController.getAssetById()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        message: 'success',
        data: mockAsset,
      });
      expect(assetService.getAssetById).toHaveBeenCalledWith(mockRequest.params.id);
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should return 404 status code and error message when asset is not found', async () => {
      assetService.getAssetById = jest.fn().mockResolvedValue(null);
      mockRequest.params.id = '1';

      await assetController.getAssetById()(mockRequest, mockResponse, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Asset with this ID not found',
      });
      expect(assetService.getAssetById).toHaveBeenCalledWith(mockRequest.params.id);
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should call the next function with the error when an exception occurs', async () => {
      const mockError = new Error('Something went wrong');
      assetService.getAssetById = jest.fn().mockRejectedValue(mockError);

      await assetController.getAssetById()(mockRequest, mockResponse, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteAsset', () => {
    it('should return 200 status code and success message when asset is deleted', async () => {
      assetService.deleteAsset = jest.fn();
      mockRequest.params.id = '1';

      await assetController.deleteAsset()(mockRequest, mockResponse, mockNextFunction);

      expect(assetService.deleteAsset).toHaveBeenCalledWith(mockRequest.params.id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Asset deleted',
      });
      expect(mockNextFunction).not.toHaveBeenCalled();
    });

    it('should call the next function with the error when an exception occurs', async () => {
      const mockError = new Error('Something went wrong');
      assetService.deleteAsset = jest.fn().mockRejectedValue(mockError);

      await assetController.deleteAsset()(mockRequest, mockResponse, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });
});