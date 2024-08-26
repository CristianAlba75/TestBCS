import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProduct } from '../../modules/product/product.dto';

@Injectable()
export class ProductDBService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(params: CreateProduct): Promise<Product> {
    return await this.productModel.create(params);
  }

  async findOne(params: Partial<Product>): Promise<Product> {
    return this.productModel.findOne({ ...params }).exec();
  }

  async find(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async update(id: string, params: Partial<Product>): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, params, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
