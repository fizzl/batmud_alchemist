import { IResourceLoaderTarget } from "../utils/resource_loader";

export interface IIngredient {
    name: string;
    pair: string;
    toString(): string;
}
export abstract class IIngredientList implements IResourceLoaderTarget {
    abstract ingest(line: string): void;
    abstract readonly list: IIngredient[];
    static async factory(): Promise<IIngredientList|null> {
        return null;
    }
}

export function selectIngredientType(type: string, ...ingredients: IIngredient[]): IIngredient {
    for(const ingredient of ingredients) {
        if(ingredient.constructor.name === type) {
            return ingredient;
        }
    }
    throw new Error(`No ingredient of type ${type} found`);
}

export function selectIngredientListType(type: string, ...lists: IIngredientList[]): IIngredientList {
    for(const list of lists) {
        if(list.constructor.name === type) {
            return list;
        }
    }
    throw new Error(`No ingredient list of type ${type} found`);
}