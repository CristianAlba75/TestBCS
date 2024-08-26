import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './customer.schema';
import { CustomerDBService } from './customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  exports: [CustomerDBService],
  providers: [CustomerDBService],
})
export class CustomerDBModule {}
