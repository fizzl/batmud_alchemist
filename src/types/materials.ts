import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";
import { IIngredient, IIngredientList } from "./ingredient";

export class Material implements IIngredient {
    pair: string;
    constructor(public name: string) {
        this.pair = "";
    }
    toString(): string {
        return this.name;
    }
}

export class Materials extends IIngredientList implements IResourceLoaderTarget{
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

