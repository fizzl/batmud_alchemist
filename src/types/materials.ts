import { ResourceLoader, IResourceLoaderTarget } from "../utils/resource_loader";

export interface IMaterial {
    name: string;
    toString(): string;
}
export class Material implements IMaterial {
    constructor(public name: string) {
    }
    toString(): string {
        return this.name;
    }
}

export class Materials implements IResourceLoaderTarget{
    materials: IMaterial[];
    
    constructor() {
        this.materials = [];
    }

    ingest(line: string) {
        this.materials.push(new Material(line));
    }

    static async factory(): Promise<Materials> {
        const me = new Materials();
        await ResourceLoader.load('/resources/materials.txt', me);
        return me;
    }
}

