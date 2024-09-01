export interface TCategory  {
    image: string;
    name: string;
    id: string;
}

export interface TProduct {
    images: string[];
    price: number;
    name: string;
    category: TCategory;
    id: string;
    discount: number;
    description: string;
}

export type TResponse = {
    categories: TCategory[];
    products: TProduct[];
}