export class CreateProduct {
  name: string;
  isActive: boolean;
  description: string;
  code: string;
}

export class GetProduct {
  code: string;
}

export class AddProduct {
  productId: string;
}
