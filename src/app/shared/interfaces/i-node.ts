import { ICategory } from './i-category';

export interface INode {
    category: ICategory;
    is_final_category: boolean;
    subcategories: INode[];
}
