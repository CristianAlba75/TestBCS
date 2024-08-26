import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ProductDBService } from '../../src/db/product/product.service';

describe('Unit test for Product DB Service', () => {
  let service: ProductDBService;
  let productModel: any;

  const mockProduct = {
    name: 'Test',
    isActive: true,
    description: 'Test',
    code: 'Test',
  };

  const mockProductModel = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockProduct),
    }),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockProduct]),
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockProduct),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockProduct),
    }),
    exec: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductDBService,
        {
          provide: getModelToken('Product'),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductDBService>(ProductDBService);
    productModel = module.get(getModelToken('Product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('(create) test method for create', () => {
    it('should create a product', async () => {
      const params = { ...mockProduct };
      const result = await service.create(params);
      expect(productModel.create).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(findOne) test method for findOne', () => {
    it('should find a product', async () => {
      const params = { name: 'Sample Product' };
      const result = await service.findOne(params);
      expect(productModel.findOne).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(find) test find method', () => {
    it('should find all active products', async () => {
      const result = await service.find();

      expect(productModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('(update) test method for update', () => {
    it('should update a product', async () => {
      const id = new Types.ObjectId().toHexString();
      const params = { ...mockProduct };
      const result = await service.update(id, params);
      expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(id, params, {
        new: true,
      });
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(delete) test method for delete', () => {
    it('should delete a product', async () => {
      const id = new Types.ObjectId().toHexString();
      await service.delete(id);
      expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
