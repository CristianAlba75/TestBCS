import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateCustomer } from '../../src/modules/customer/customer.dto';
import { CustomerDBService } from '../../src/db/customer/customer.service';
import { Types } from 'mongoose';

describe('Unit test for Customer DB Service', () => {
  let service: CustomerDBService;
  let customerModel: any;

  const mockCustomerId = new Types.ObjectId('507f1f77bcf86cd799439011');
  const mockProductId = new Types.ObjectId('507f1f77bcf86cd799439012');

  const mockCustomer = {
    documentNumber: 'Test',
    documentType: 'Test',
    name: 'Test',
    email: 'test@gmail.com',
    products: [],
  };

  const mockCustomerModel = {
    create: jest.fn().mockResolvedValue(mockCustomer),
    findOne: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockCustomer]),
    }),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockCustomer),
    updateOne: jest.fn().mockReturnThis(),
    updateMany: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerDBService,
        {
          provide: getModelToken('Customer'),
          useValue: mockCustomerModel,
        },
      ],
    }).compile();

    service = module.get<CustomerDBService>(CustomerDBService);
    customerModel = module.get(getModelToken('Customer'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('(create) test create method', () => {
    it('should create a customer', async () => {
      const params: CreateCustomer = {
        ...mockCustomer,
      };
      const result = await service.create(params);
      expect(customerModel.create).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('(findOne) test findOne method', () => {
    it('should find a customer by any param', async () => {
      const param = { documentNumber: 'Test' };
      const result = await service.findOne(param);

      expect(customerModel.findOne).toHaveBeenCalledWith(param);
      expect(customerModel.populate).toHaveBeenCalledWith('products');
      expect(customerModel.exec).toHaveBeenCalled();
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('(find) test find method', () => {
    it('should find all customers', async () => {
      const result = await service.find();

      expect(customerModel.find).toHaveBeenCalled();
      expect(customerModel.exec).toHaveBeenCalled();
      expect(result).toEqual([mockCustomer]);
    });
  });

  describe('(addProducts) test method for add products', () => {
    it('should add products to a customer', async () => {
      mockCustomerModel.exec.mockResolvedValue({ modifiedCount: 1 });
      const result = await service.addProducts(
        mockCustomerId.toHexString(),
        mockProductId.toHexString(),
      );

      expect(customerModel.updateOne).toHaveBeenCalledWith(
        { _id: mockCustomerId },
        { $addToSet: { products: mockProductId } },
      );
      expect(customerModel.exec).toHaveBeenCalled();
      expect(result).toEqual({ modifiedCount: 1 });
    });
  });

  describe('(deleteProductFromCustomer) test method for delete products from customer', () => {
    it('should remove a product from all customers', async () => {
      await service.deleteProductFromCustomer(mockProductId.toHexString());

      expect(customerModel.updateMany).toHaveBeenCalledWith(
        { products: mockProductId },
        { $pull: { products: mockProductId } },
      );
      expect(customerModel.exec).toHaveBeenCalled();
    });
  });
});
