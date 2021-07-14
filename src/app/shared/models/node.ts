import { ICategory, INode } from '../interfaces';
import { Category } from './category';

export class Node implements INode {
    category: ICategory;
    is_final_category: boolean;
    subcategories: INode[];

    constructor(data?: INode) {
        if (data) {
            if (data['category']) this.category = new Category(data.category);
            if (data['is_final_category']) this.is_final_category = data.is_final_category;
            if (data['subcategories']) this.subcategories = data.subcategories.map(x => new Node(x));
        }
    }
}