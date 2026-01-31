import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductByIdAction } from '../actions/get-product-by-id.action';
import { createUpdateProductAction } from '../actions/create-update-product.action';
import type { Product } from '@/interfaces/product.interface';

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 Minutos
    //enabled: !!id
  });

  const mutacionProduct = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({
        queryKey: ['product', { id: product.id }],
      });

      // Actualizar data
      queryClient.setQueryData(['products', { id: product.id }], product);
    },
  });

  //TODO por eliminar
  return {
    ...query,
    mutacionProduct,
  };
};
