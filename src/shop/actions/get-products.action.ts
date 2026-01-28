import type { ProductsResponse } from '@/interfaces/products.response';
import { tesloApi } from '../../api/tesloApi';

const baseURL = import.meta.env.VITE_API_URL;

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, sizes, gender, minPrice, maxPrice, query } = options;

  const { data } = await tesloApi.get<ProductsResponse>('/products', {
    params: {
      limit,
      offset,
      sizes,
      gender,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  ///files/product/8765100-00-A_1.jpg
  const productsWithImageUrl = data.products.map((product) => ({
    ...product,
    images: product.images.map((image) => `${baseURL}/files/product/${image}`),
  }));

  return {
    ...data,
    products: productsWithImageUrl,
  };
};
