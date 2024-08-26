import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct, GetProduct } from './product.dto';
import { CustomerService } from '../customer/customer.service';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  async createProduct(@Body() params: CreateProduct) {
    this.logger.log('Creating new product');
    const newProduct = await this.productService.createProduct(params);
    this.logger.log('Product created successfully');
    return newProduct;
  }

  @Get()
  async getProduct(@Query() params: GetProduct) {
    this.logger.log('Fetching product');
    const product = await this.productService.getProduct(params);
    this.logger.log('Product fetched successfully');
    return product;
  }

  @Get('all')
  async getAllProducts() {
    this.logger.log('Fetching all products');
    const products = await this.productService.getAllProducts();
    this.logger.log('Products fetched successfully');
    return products;
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() params: CreateProduct) {
    this.logger.log('Updating product');
    const product = await this.productService.updateProduct(id, params);
    this.logger.log('Product updated successfully');
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    this.logger.log('Deleting customer products');
    await this.customerService.deleteProductFromCustomer(id);
    this.logger.log(
      'Customer products deleted successfully, proceeding to delete product',
    );
    await this.productService.deleteProduct(id);
    this.logger.log('Product deleted successfully');
    return;
  }
}
