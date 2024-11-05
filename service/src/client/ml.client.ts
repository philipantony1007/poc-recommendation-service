import axios from 'axios';
import { readConfiguration } from '../utils/config.utils';
import CustomError from '../errors/custom.error';

export const createMLClient = () => {
  const config = readConfiguration();
  const endpointUrl = config.ml_model_endpoint;

  const axiosInstance = axios.create({
    baseURL: endpointUrl,
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if required
    },
  });

  const predict = async (body: any): Promise<any> => {
    try {
      const response = await axiosInstance.post(endpointUrl, body);
      return response;
    } catch (error) {
      console.error("Error invoking ML endpoint:", error);
      throw new CustomError(500,'Error invoking ML endpoint:');
    }
  };

  return { predict };
};

export type MLClient = ReturnType<typeof createMLClient>;