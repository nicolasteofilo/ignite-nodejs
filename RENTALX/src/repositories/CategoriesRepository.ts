import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ description, name }: ICreateCategoryDTO): Category {
        const category = new Category();

        // atribuindo itens para dentro do meu objeto category
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })
    
        this.categories.push(category);

        return category;
    }

    findAll(): Category[] {
        return this.categories;
    }

    findByIdName(name: string): Category {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}

export { CategoriesRepository }