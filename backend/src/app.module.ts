import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/nestjs-app'),
    CustomerModule,
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}
