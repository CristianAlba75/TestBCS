import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../../../src/modules/customer/customer.controller';
import { CustomerService } from '../../../src/modules/customer/customer.service';
import {
  CreateCustomer,
  GetCustomer,
} from '../../../src/modules/customer/customer.dto';

describe('Unit tests for Customer Controller', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockCustomer = {
    documentNumber: 'Test',
    documentType: 'Test',
    name: 'Test',
    email: 'test@gmail.com',
    products: [],
  };

  const mockCustomerService = {
    createCustomer: jest.fn().mockResolvedValue(mockCustomer),
    getCustomer: jest.fn().mockResolvedValue(mockCustomer),
    getAllCustomers: jest.fn().mockResolvedValue([mockCustomer]),
    addProduct: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('(createCustomer) test create customer endpoint', () => {
    it('should create a customer', async () => {
      const params: CreateCustomer = {
        documentNumber: 'Test',
        documentType: 'Test',
        name: 'Test',
        email: 'test@gmail.com',
      };
      const result = await controller.createCustomer(params);
      expect(service.createCustomer).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('(getCustomer) test get customer endpoint', () => {
    it('should get a customer', async () => {
      const params: GetCustomer = { documentNumber: 'Test' };
      const result = await controller.getCustomer(params);
      expect(service.getCustomer).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('(getAllCustomers) test get all customers endpoint', () => {
    it('should get all customers', async () => {
      const result = await controller.getAllCustomers();
      expect(service.getAllCustomers).toHaveBeenCalled();
      expect(result).toEqual([mockCustomer]);
    });
  });

  describe('(addProduct) test add product endpoint', () => {
    it('should add a product to a customer', async () => {
      const customerId = '507f1f77bcf86cd799439011';
      const productId = '507f1f77bcf86cd799439012';
      await controller.addProduct(customerId, productId);
      expect(service.addProduct).toHaveBeenCalledWith(customerId, productId);
    });
  });
});
