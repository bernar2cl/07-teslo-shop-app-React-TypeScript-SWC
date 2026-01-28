import type { User } from './user.interface';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: string;
  tags: string[];
  images: string[];
  user: User;
}

export type Size = 'L' | 'M' | 'S' | 'XL' | 'XS' | 'XXL';

export type Gender = 'Kid' | 'men' | 'women' | 'unisex';

// export enum Size {
//   L = 'L',
//   M = 'M',
//   S = 'S',
//   Xl = 'XL',
//   Xs = 'XS',
//   Xxl = 'XXL',
// }
