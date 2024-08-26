import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateCustomer } from '../../../src/modules/customer/customer.dto';
import { CustomerDBService } from '../../../src/db/customer/customer.service';
import { CustomerService } from '../../../src/modules/customer/customer.service';

describe('Unit tests for Customer Service', () => {
  let service: CustomerService;
  let dbService: CustomerDBService;

  const mockCustomer = {
    documentNumber: 'Test',
    documentType: 'Test',
    name: 'Test',
    email: 'test@gmail.com',
    products: [],
  };

  const mockDBService = {
    create: jest.fn().mockResolvedValue(mockCustomer),
    findOne: jest.fn().mockResolvedValue(mockCustomer),
    find: jest.fn().mockResolvedValue([mockCustomer]),
    addProducts: jest.fn().mockResolvedValue(undefined),
    deleteProductFromCustomer: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerDBService,
          useValue: mockDBService,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    dbService = module.get<CustomerDBService>(CustomerDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('(createCustomer) test method for create customer', () => {
    it('should create a customer', async () => {
      const params: CreateCustomer = {
        documentNumber: 'Test',
        documentType: 'Test',
        name: 'Test',
        email: 'test@gmail.com',
      };
      const result = await service.createCustomer(params);
      expect(dbService.create).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('(getCustomer) test method for get customer', () => {
    it('should get a customer', async () => {
      const params = { email: 'john.doe@example.com' };
      const result = await service.getCustomer(params);
      expect(dbService.findOne).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('(getAllCustomers) test method for get all customers', () => {
    it('should get al customer', async () => {
      const result = await service.getAllCustomers();
      expect(dbService.find).toHaveBeenCalled();
      expect(result).toEqual([mockCustomer]);
    });
  });

  describe('(addProduct) test method for update customer', () => {
    it('should add a product to a customer', async () => {
      const customerId = new Types.ObjectId().toHexString();
      const productId = new Types.ObjectId().toHexString();
      await service.addProduct(customerId, productId);
      expect(dbService.addProducts).toHaveBeenCalledWith(customerId, productId);
    });
  });

  describe('(deleteProductFromCustomer) test method for delete products from customer', () => {
    it('should delete a product from a customer', async () => {
      const productId = new Types.ObjectId().toHexString();
      await service.deleteProductFromCustomer(productId);
      expect(dbService.deleteProductFromCustomer).toHaveBeenCalledWith(
        productId,
      );
    });
  });
});
