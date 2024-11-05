import { Request, Response } from 'express';
import { sendSkusToMLModel } from '../service/ml.service';
import CustomError from '../errors/custom.error';
import { fetchProducts, uniqueRecommendedProducts } from '../service/product.service';
import { InvalidRequestBodyError } from '../errors/extendedCustom.error';

export const post = async (request: Request, response: Response) => {

  const { customer_basket } = request.body;

  if (!Array.isArray(customer_basket) || !customer_basket.every(sku => typeof sku === 'string')) {
    throw new InvalidRequestBodyError()
  }

  try {
    // Send SKUs to ML model and fetch recommended SKUs
    const recommended_product_skus: string[] = await sendSkusToMLModel(customer_basket);
    

    // Fetch all recommended products based on the SKUs
    const allRecommendedProducts = await fetchProducts(recommended_product_skus);
   

    // Get unique products from the recommended list
    const uniqueProducts = uniqueRecommendedProducts(allRecommendedProducts);

    // Send back the unique recommended products in the response
    response.json({ recommendedProducts: uniqueProducts });

  } catch (error) {
    console.error('Error fetching cart or products:', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, 'Internal Server Error');
  }
};
