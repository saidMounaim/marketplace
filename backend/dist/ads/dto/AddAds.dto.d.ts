declare enum Category {
    CLOTHES = "CLOTHES",
    ELECTRONICS = "ELECTRONICS",
    FURNITURE = "FURNITURE",
    TOYS = "TOYS",
    BOOKS = "BOOKS"
}
export declare class AddAdsDto {
    title: string;
    description: string;
    price: number;
    contact: string;
    category: Category;
}
export {};
