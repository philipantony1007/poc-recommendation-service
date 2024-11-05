import CustomError from '../errors/custom.error';
import envValidators from '../validators/env.validators';
import { getValidateMessages } from '../validators/helpers.validators';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const envVars = {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    projectKey: process.env.CTP_PROJECT_KEY as string,
    scope: process.env.CTP_SCOPE,
    region: process.env.CTP_REGION as string,
    ml_model_endpoint: process.env.ML_MODEL_END_POINT as string,
  };

  const validationErrors = getValidateMessages(envValidators, envVars);

  if (validationErrors.length) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables please check your .env file',
      validationErrors
    );
  }

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  };
  

  if (!envVars.ml_model_endpoint || !isValidUrl(envVars.ml_model_endpoint)) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables: ML_MODEL_END_POINT is not a valid URL. Please check your .env file.'
    );
  }

  

  return envVars;
};
