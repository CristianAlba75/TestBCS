import { Injectable } from '@nestjs/common';
import { CustomerDBService } from '../../db/customer/customer.service';
import { Customer } from '../../db/customer/customer.schema';
import { CreateCustomer } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly dbService: CustomerDBService) {}

  async createCustomer(params: CreateCustomer): Promise<Customer> {
    return await this.dbService.create(params);
  }

  async getCustomer(params: Partial<Customer>): Promise<Customer> {
    return await this.dbService.findOne(params);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return await this.dbService.find();
  }

  async addProduct(customerId: string, productId: string) {
    return await this.dbService.addProducts(customerId, productId);
  }

  async deleteProductFromCustomer(productId: string) {
    return await this.dbService.deleteProductFromCustomer(productId);
  }
}
