import CustomError from '../errors/custom.error';


export class InvalidRequestBodyError extends CustomError {
    constructor() {
      super(400, `Invalid input: customer_basket must be an array of SKU strings.`);
    }
  }




