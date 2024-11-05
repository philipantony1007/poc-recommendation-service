import CustomError from '../errors/custom.error';
import { createMLClient } from '../client/ml.client';


export const sendSkusToMLModel = async (customer_basket: string[]): Promise<string[]> => {
    try {
      console.log('Sending SKUs:', customer_basket);
      
      const mlClient = createMLClient()
      const payload = {
        customer_basket: customer_basket, 
      };

      const response = await mlClient.predict(payload);
      return response.data.mba_recommendations;
    
    } catch (error: any) {
        console.error('Error sending SKUs to ML model:', error);
        throw new CustomError(500, error.message, error);
    }
  };
  
