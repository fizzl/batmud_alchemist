import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";

export interface IHerb {
    name: string;
    pair: string;
    toString(): string;
}
export class Herb implements IHerb {
    constructor(public name: string, public pair: string) { 

    }
    toString(): string {
        return `${this.name} / ${this.pair}`;
    }

}
export class Herbs implements IResourceLoaderTarget{
    herbs: Herb[];
    
    constructor() {
        this.herbs = [];
    }

    ingest(line: string) {
        const both = line.split(':');
        this.herbs.push(new Herb(both[0], both[1]));
    }

    static async factory(): Promise<Herbs> {
        const me = new Herbs();
        await ResourceLoader.load('/resources/herbs.txt', me);
        return me;
    }
}

