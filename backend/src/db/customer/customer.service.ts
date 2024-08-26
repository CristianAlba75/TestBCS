import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomer } from '../../modules/customer/customer.dto';

@Injectable()
export class CustomerDBService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
  ) {}

  async create(params: CreateCustomer): Promise<Customer> {
    return await this.customerModel.create(params);
  }

  async addProducts(customerId: string, productId: string) {
    const customerObjectId = new Types.ObjectId(customerId);
    const productObjectId = new Types.ObjectId(productId);
    return this.customerModel
      .updateOne(
        { _id: customerObjectId },
        { $addToSet: { products: productObjectId } },
      )
      .exec();
  }

  async find(): Promise<Customer[]> {
    return this.customerModel.find().populate('products').exec();
  }

  async findOne(params: Partial<Customer>): Promise<Customer> {
    return this.customerModel
      .findOne({ ...params })
      .populate('products')
      .exec();
  }

  async deleteProductFromCustomer(productId: string) {
    const productObjectId = new Types.ObjectId(productId);

    await this.customerModel
      .updateMany(
        { products: productObjectId },
        { $pull: { products: productObjectId } },
      )
      .exec();
  }
}
