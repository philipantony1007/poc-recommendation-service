import { createApiRoot } from '../client/create.client';

export const getProductsBySku = async (sku: string): Promise<any[]> => {
  const filterQuery = `variants.sku:"${sku}"`;

  const recommendedProducts = await createApiRoot()
    .productProjections()
    .search()
    .get({ queryArgs: { 'filter.query': filterQuery } })
    .execute();

  return recommendedProducts.body.results;
};




