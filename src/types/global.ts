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
    discounPrice: number;
    description: string;
}
