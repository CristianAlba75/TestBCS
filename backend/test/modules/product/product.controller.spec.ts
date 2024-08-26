import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateProduct,
  GetProduct,
} from '../../../src/modules/product/product.dto';
import { CustomerService } from '../../../src/modules/customer/customer.service';
import { ProductService } from '../../../src/modules/product/product.service';
import { ProductController } from '../../../src/modules/product/product.controller';

describe('Unit tests for Product Controller', () => {
  let controller: ProductController;
  let productService: ProductService;
  let customerService: CustomerService;

  const mockProduct = {
    name: 'Test',
    isActive: true,
    description: 'Test',
    code: 'Test',
  };

  const mockProductService = {
    createProduct: jest.fn().mockResolvedValue(mockProduct),
    getProduct: jest.fn().mockResolvedValue(mockProduct),
    getAllProducts: jest.fn().mockResolvedValue([mockProduct]),
    updateProduct: jest.fn().mockResolvedValue(mockProduct),
    deleteProduct: jest.fn().mockResolvedValue(undefined),
  };

  const mockCustomerService = {
    deleteProductFromCustomer: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('(createProduct) test create product endpoint', () => {
    it('should create a product', async () => {
      const params: CreateProduct = { ...mockProduct };
      const result = await controller.createProduct(params);
      expect(productService.createProduct).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(getProduct) test get product endpoint', () => {
    it('should get a product', async () => {
      const params: GetProduct = { code: 'Test' };
      const result = await controller.getProduct(params);
      expect(productService.getProduct).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(getAllProducts) test get all products endpoint', () => {
    it('should get all products', async () => {
      const result = await controller.getAllProducts();
      expect(productService.getProduct).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('(updateProduct) test update product endpoint', () => {
    it('should update a product', async () => {
      const id = '507f1f77bcf86cd799439011';
      const params: CreateProduct = { ...mockProduct };
      const result = await controller.updateProduct(id, params);
      expect(productService.updateProduct).toHaveBeenCalledWith(id, params);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('(deleteProduct) test delete product endpoint', () => {
    it('should delete a product', async () => {
      const id = '507f1f77bcf86cd799439011';
      await controller.deleteProduct(id);
      expect(customerService.deleteProductFromCustomer).toHaveBeenCalledWith(
        id,
      );
      expect(productService.deleteProduct).toHaveBeenCalledWith(id);
    });
  });
});
