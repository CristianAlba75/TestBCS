import { Injectable } from '@nestjs/common';
import { CreateProduct } from './product.dto';
import { ProductDBService } from '../../db/product/product.service';
import { Product } from '../../db/product/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: ProductDBService) {}

  async createProduct(params: CreateProduct): Promise<Product> {
    return await this.dbService.create(params);
  }

  async getProduct(params: Partial<Product>): Promise<Product> {
    return await this.dbService.findOne(params);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.dbService.find();
  }

  async updateProduct(id: string, params: Partial<Product>): Promise<Product> {
    return await this.dbService.update(id, params);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.dbService.delete(id);
  }
}
