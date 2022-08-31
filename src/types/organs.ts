import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";

export interface IOrgan {
    name: string;
    toString(): string;
}
export class Organ implements IOrgan {
    constructor(public name: string) {

    }
    toString(): string {
        return this.name;
    }
}
export class Organs implements IResourceLoaderTarget{
    organs: Organ[];
    
    constructor() {
        this.organs = [];
    }

    ingest(line: string) {
        this.organs.push(new Organ(line));
    }

    static async factory(): Promise<Organs> {
        const me = new Organs();
        await ResourceLoader.load('/resources/organs.txt', me);
        return me;
    }
}

