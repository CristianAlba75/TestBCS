import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateProduct } from '../../../src/modules/product/product.dto';
import { ProductDBService } from '../../../src/db/product/product.service';
import { ProductService } from '../../../src/modules/product/product.service';

describe('Unit tests for Product Service', () => {
  let service: ProductService;
  let dbService: ProductDBService;

  const mockProduct = {
    name: 'Test',
    isActive: true,
    description: 'Test',
    code: 'Test',
  };

  const mockDBService = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockResolvedValue([mockProduct]),
    update: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductDBService,
          useValue: mockDBService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    dbService = module.get<ProductDBService>(ProductDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('(createProduct) test method for create product', () => {
    it('should create a product', async () => {
      const params: CreateProduct = { ...mockProduct };
      const result = await service.createProduct(params);
      expect(dbService.create).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(getProduct) test method for get product', () => {
    it('should get a product', async () => {
      const params = { name: 'Sample Product' };
      const result = await service.getProduct(params);
      expect(dbService.findOne).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(getAllProducts) test method for get all products', () => {
    it('should get all products', async () => {
      const result = await service.getAllProducts();
      expect(dbService.findOne).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('(updateProduct) test method for update product', () => {
    it('should update a product', async () => {
      const id = new Types.ObjectId().toHexString();
      const params = { ...mockProduct };
      const result = await service.updateProduct(id, params);
      expect(dbService.update).toHaveBeenCalledWith(id, params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(deleteProduct) test method for delete product', () => {
    it('should delete a product', async () => {
      const id = new Types.ObjectId().toHexString();
      await service.deleteProduct(id);
      expect(dbService.delete).toHaveBeenCalledWith(id);
    });
  });
});
