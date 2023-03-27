export interface Product {
  id: number;
  title: string;
  description: string;
  price: number | null;
  discountPercentage?: number;
  rating: number;
  stock: number | null;
  brand?: string;
  category: string;
  thumbnail?: string;
  images?: string[];
}
