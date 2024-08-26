export class CreateCustomer {
  documentType: string;
  documentNumber: string;
  name: string;
  email: string;
}

export class GetCustomer {
  documentNumber: string;
}
