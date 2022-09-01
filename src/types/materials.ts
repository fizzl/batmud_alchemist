import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";
import { IIngredient, IIngrediententList } from "./ingredient";

export class Material implements IIngredient {
    constructor(public name: string) {
    }
    toString(): string {
        return this.name;
    }
}

export class Materials extends IIngrediententList implements IResourceLoaderTarget{
    list: Material[];
    
    constructor() {
        super();
        this.list = [];
    }

    ingest(line: string) {
        this.list.push(new Material(line));
    }

    static async factory(): Promise<Materials> {
        const me = new Materials();
        await ResourceLoader.load('/resources/materials.txt', me);
        return me;
    }
}
