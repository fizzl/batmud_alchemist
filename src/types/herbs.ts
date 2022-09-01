import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";
import { IIngredient, IIngredientList } from "./ingredient";

export interface IHerb extends IIngredient{
    pair: string;
}
export class Herb implements IHerb {
    constructor(public name: string, public pair: string) { 

    }
    toString(): string {
        return `${this.name} / ${this.pair}`;
    }

}
export class Herbs extends IIngredientList {
    list: Herb[];
    
    constructor() {
        super();
        this.list = [];
    }
    ingest(line: string) {
        const both = line.split(':');
        this.list.push(new Herb(both[0], both[1]));
    }

    static async factory(): Promise<Herbs> {
        const me = new Herbs();
        await ResourceLoader.load('/resources/herbs.txt', me);
        return me;
    }
}

