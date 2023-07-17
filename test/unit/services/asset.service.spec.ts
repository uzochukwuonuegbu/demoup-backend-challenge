import { AssetService } from '../../../src/services/asset.service';
import { IAssetRepository, IAssetsCategoryRepository } from '../../../src/interfaces';

describe('AssetService', () => {
  let assetService: AssetService;
  let assetRepository: IAssetRepository;
  let assetCategoryRepository: IAssetsCategoryRepository;

  beforeEach(() => {
    assetRepository = {} as IAssetRepository; // Mock the asset repository
    assetCategoryRepository = {} as IAssetsCategoryRepository; // Mock the asset category repository
    assetService = new AssetService(assetRepository, assetCategoryRepository);
  });

  describe('createAsset', () => {
    it('should create an asset and add categories when data is valid', async () => {
      const mockData = { name: 'Asset 1', categoryIds: [1, 2, 3] };
      const mockAssetResult = { id: '1', name: 'Asset 1' };
      const mockCategoryPromises = [
        Promise.resolve(),
        Promise.resolve(),
        Promise.resolve(),
      ];

      assetRepository.create = jest.fn().mockResolvedValue(mockAssetResult);
      assetCategoryRepository.create = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      });

      await expect(assetService.createAsset(mockData)).resolves.toEqual(mockAssetResult);

      expect(assetRepository.create).toHaveBeenCalledWith(mockData);
      expect(assetCategoryRepository.create).toHaveBeenCalledTimes(mockData.categoryIds.length);
      expect(assetCategoryRepository.create).toHaveBeenCalledWith({
        asset_id: mockAssetResult.id,
        category_id: expect.any(Number),
      });
    });

    it('should throw BadRequestError when asset creation fails', async () => {
      const mockData = { name: 'Asset 1', categoryIds: [1, 2, 3] };
      const mockError = new Error('Failed to create asset');

      assetRepository.create = jest.fn().mockRejectedValue(mockError);

      await expect(assetService.createAsset(mockData)).rejects.toThrow(Error);
      expect(assetRepository.create).toHaveBeenCalledWith(mockData);
    });

    it('should throw BadRequestError when adding categories fails', async () => {
      const mockData = { name: 'Asset 1', categoryIds: [1, 2, 3] };
      const mockAssetResult = { id: '1', name: 'Asset 1' };
      const mockError = new Error('Failed to add categories');

      assetRepository.create = jest.fn().mockResolvedValue(mockAssetResult);
      assetCategoryRepository.create = jest.fn().mockRejectedValue(mockError);

      await expect(assetService.createAsset(mockData)).rejects.toThrow(Error);
      expect(assetRepository.create).toHaveBeenCalledWith(mockData);
      expect(assetCategoryRepository.create).toHaveBeenCalledWith({
        asset_id: mockAssetResult.id,
        category_id: expect.any(Number),
      });
    });
  });

  describe('getAssets', () => {
    it('should return an array of assets when filter is provided', async () => {
      const mockFilter = { category: 'example' };
      const mockAssets = [{ id: '1', name: 'Asset 1' }, { id: '2', name: 'Asset 2' }];

      assetRepository.findAll = jest.fn().mockResolvedValue(mockAssets);

      await expect(assetService.getAssets(mockFilter)).resolves.toEqual(mockAssets);
      expect(assetRepository.findAll).toHaveBeenCalledWith(mockFilter);
    });

    it('should return an array of assets when filter is not provided', async () => {
      const mockAssets = [{ id: '1', name: 'Asset 1' }, { id: '2', name: 'Asset 2' }];

      assetRepository.findAll = jest.fn().mockResolvedValue(mockAssets);

      await expect(assetService.getAssets({})).resolves.toEqual(mockAssets);
      expect(assetRepository.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('getAssetById', () => {
    it('should return an asset by ID', async () => {
      const mockAssetId = '1';
      const mockAsset = { id: mockAssetId, name: 'Asset 1' };

      assetRepository.findById = jest.fn().mockResolvedValue(mockAsset);

      await expect(assetService.getAssetById(mockAssetId)).resolves.toEqual(mockAsset);
      expect(assetRepository.findById).toHaveBeenCalledWith(mockAssetId);
    });
  });

  describe('getAssetsByCategoryId', () => {
    it('should return an array of assets by category ID', async () => {
      const mockCategoryId = '1';
      const mockAssetsByCategory = [
        { id: '1', name: 'Asset 1', category: 'Category 1' },
        { id: '2', name: 'Asset 2', category: 'Category 1' },
      ];

      assetCategoryRepository.findAssetsByCategoryId = jest
        .fn()
        .mockResolvedValue(mockAssetsByCategory);

      await expect(assetService.getAssetsByCategoryId(mockCategoryId)).resolves.toEqual(
        mockAssetsByCategory
      );
      expect(assetCategoryRepository.findAssetsByCategoryId).toHaveBeenCalledWith(mockCategoryId);
    });
  });

  describe('getAssetsByCollectionId', () => {
    it('should return an array of assets by collection ID', async () => {
      const mockCollectionId = '1';
      const mockAssetsByCollection = [
        { id: '1', name: 'Asset 1', collection: 'Collection 1' },
        { id: '2', name: 'Asset 2', collection: 'Collection 1' },
      ];

      assetRepository.findByAssetsCollectionId = jest
        .fn()
        .mockResolvedValue(mockAssetsByCollection);

      await expect(assetService.getAssetsByCollectionId(mockCollectionId)).resolves.toEqual(
        mockAssetsByCollection
      );
      expect(assetRepository.findByAssetsCollectionId).toHaveBeenCalledWith(mockCollectionId);
    });
  });

  describe('updateAsset', () => {
    it('should update an asset by ID', async () => {
      const mockAssetId = '1';
      const mockUpdateData = { name: 'Updated Asset 1' };

      assetRepository.update = jest.fn();

      await assetService.updateAsset(mockAssetId, mockUpdateData);

      expect(assetRepository.update).toHaveBeenCalledWith(mockAssetId, mockUpdateData);
    });
  });

  describe('deleteAsset', () => {
    it('should delete an asset by ID', async () => {
      const mockAssetId = '1';

      assetRepository.delete = jest.fn();

      await assetService.deleteAsset(mockAssetId);

      expect(assetRepository.delete).toHaveBeenCalledWith(mockAssetId);
    });
  });
});