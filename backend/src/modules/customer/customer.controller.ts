import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomer, GetCustomer } from './customer.dto';

@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() params: CreateCustomer) {
    this.logger.log('Creating new customer');
    const newCustomer = await this.customerService.createCustomer(params);
    this.logger.log('Customer created successfully');
    return newCustomer;
  }

  @Get()
  async getCustomer(@Query() params: GetCustomer) {
    this.logger.log('Fetching customer');
    const customer = await this.customerService.getCustomer(params);
    this.logger.log('Customer fetched successfully');
    return customer;
  }

  @Get('all')
  async getAllCustomers() {
    this.logger.log('Fetching all customers');
    const customers = await this.customerService.getAllCustomers();
    this.logger.log('Customers fetched successfully');
    return customers;
  }

  @Patch('add-product/:id')
  async addProduct(
    @Param('id') id: string,
    @Body('productId') productId: string,
  ) {
    this.logger.log('Adding product to customer');
    await this.customerService.addProduct(id, productId);
    this.logger.log('Product customer added successfully');
  }
}
