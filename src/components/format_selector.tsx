import React from "react";
import { Herbs } from "../types/herbs";
import { IIngredientList } from "../types/ingredient";
import { Materials } from "../types/materials";
import { Organs } from "../types/organs";

interface IFormatSelectorProps {
    materials: Materials,
    herbs: Herbs,
    organs: Organs,
    indexList: IIngredientList;
    axisXList: IIngredientList;
    axisYList: IIngredientList;
    onFormatChange: (indexList: IIngredientList, axisXList: IIngredientList, axisYList: IIngredientList) => void
}
interface IFormatSelectorState {
}

export class FormatSelector extends React.Component<IFormatSelectorProps, IFormatSelectorState> {
    constructor(props: IFormatSelectorProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <label>Index</label>
                <select onChange={(e) => this.onIndexChange(e)}>
                    <option value={Materials.name}>{Materials.name}</option>
                    <option value={Herbs.name}>{Herbs.name}</option>
                    <option value={Organs.name}>{Organs.name}</option>
                </select>
                <button onClick={() => this.onFlipAxis()}>Flip Axis</button>
            </div>
        );
    }
    onFlipAxis() {
        this.props.onFormatChange(
            this.props.indexList, 
            this.props.axisYList, 
            this.props.axisXList);
    }
    onIndexChange(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log('onIndexChange', e.target.value);
        switch (e.target.value) {
            case Materials.name:
                this.props.onFormatChange(
                    this.props.materials, 
                    this.props.herbs, 
                    this.props.organs);
                break;
            case Herbs.name:
                this.props.onFormatChange(
                    this.props.herbs, 
                    this.props.materials, 
                    this.props.organs);
                break;
            case Organs.name:
                this.props.onFormatChange(
                    this.props.organs, 
                    this.props.herbs, 
                    this.props.materials);
                break;
        }
    }
}
