import { IResourceLoaderTarget } from "../utils/resource_loader";

export interface IIngredient {
    name: string;
    toString(): string;
}
export abstract class IIngrediententList implements IResourceLoaderTarget {
    abstract ingest(line: string): void;
    abstract readonly list: IIngredient[];
    static async factory(): Promise<IIngrediententList|null> {
        return null;
    }
}
