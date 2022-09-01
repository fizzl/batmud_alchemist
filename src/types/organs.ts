import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";
import { IIngredient, IIngrediententList } from "./ingredient";

export class Organ implements IIngredient {
    constructor(public name: string) {
    }
    toString(): string {
        return this.name;
    }
}
export class Organs extends IIngrediententList implements IResourceLoaderTarget{
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
