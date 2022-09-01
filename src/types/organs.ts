import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";
import { IIngredient, IIngredientList } from "./ingredient";

export class Organ implements IIngredient {
    pair: string;
    constructor(public name: string) {
        this.pair = "";
    }
    toString(): string {
        return this.name;
    }
}
export class Organs extends IIngredientList implements IResourceLoaderTarget{
    list: Organ[];
    
    constructor() {
        super()
        this.list = [];
    }

    ingest(line: string) {
        this.list.push(new Organ(line));
    }

    static async factory(): Promise<Organs> {
        const me = new Organs();
        await ResourceLoader.load('/resources/organs.txt', me);
        return me;
    }
}
