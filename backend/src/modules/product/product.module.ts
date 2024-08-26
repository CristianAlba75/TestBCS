import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDBModule } from '../../db/product/product.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [ProductDBModule, CustomerModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
