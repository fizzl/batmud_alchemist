import { Herb } from "../types/herbs";
import { IIngredient } from "../types/ingredient";
import { Material } from "../types/materials";
import { Organ } from "../types/organs";

export enum  DataPointStatus {
    Unknown = 0,
    Close = 1,
    Known = 2,
    NoSkill = 3
}
 
export interface IPotionResearchDataPoint {
    status: DataPointStatus;
    spell: string;
    material: Material;
    herb: Herb;
    organ: Organ;
}

export interface IPotionResearchData {
    data: IPotionResearchDataPoint[][][];
}

export class PotionResearchData implements IPotionResearchData {
    public data: IPotionResearchDataPoint[][][];
    constructor() {
        this.data=[];
    }
    loadFromGgr(text: string) {
        
    }
}