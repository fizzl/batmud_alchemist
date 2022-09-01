import React from "react";
import { Herbs } from '../types/herbs';
import { IIngredientList } from "../types/ingredient";
import { Materials } from '../types/materials';
import { Organs } from '../types/organs';
import { LoadState } from "../utils/load_state";
import { DataSource } from "./data_source";
import { FormatSelector } from "./format_selector";
import { MaterialList } from "./material_list";

interface IPotionsProps {
}
interface IPotionsState {
    materials: IIngredientList;
    herbs: IIngredientList;
    organs: IIngredientList;
    indexList: IIngredientList;
    axisXList: IIngredientList;
    axisYList: IIngredientList;
    loadState: LoadState;
    error?: any;
}

export class Potions extends React.Component<IPotionsProps, IPotionsState> {
    constructor(props: IPotionsProps) {
        super(props);
        const materials = new Materials();
        const herbs = new Herbs();
        const organs = new Organs();
        this.state = {
            materials: materials,
            herbs: herbs,
            organs: organs,
            indexList: materials,
            axisXList: herbs,
            axisYList: organs,
            loadState: LoadState.INITIAL,
        }
    }

    render() {
        return (
            <div>
                <DataSource/>
                <FormatSelector
                    materials={this.state.materials}
                    herbs={this.state.herbs}
                    organs={this.state.organs}
                    indexList={this.state.indexList}
                    axisXList={this.state.axisXList}
                    axisYList={this.state.axisYList}
                    onFormatChange={this.onFormatChange.bind(this)}
                />
                <MaterialList
                    indexIngredients={this.state.indexList}
                    axisXInrgedients={this.state.axisXList}
                    axisYIngredients={this.state.axisYList}
                    loadState={this.state.loadState} />
            </div>
        )
    }
    onFormatChange(indexList: IIngredientList, axisXList: IIngredientList, axisYList: IIngredientList) {
        console.log('onFormatChange', indexList, axisXList, axisYList);
        this.setState({
            indexList: indexList,
            axisXList: axisXList,
            axisYList: axisYList,
        });
    }
    async componentDidMount() {
        if (this.state.loadState !== LoadState.INITIAL) {
            return;
        }
        console.log('MaterialList componentDidMount', this.props);
        try {
            this.setState({
                loadState: LoadState.LOADING
            });
            const materials = await Materials.factory();
            const herbs = await Herbs.factory();
            const organs = await Organs.factory();
            this.setState({
                materials: materials,
                herbs: herbs,
                organs: organs,
                indexList: materials,
                axisXList: herbs,
                axisYList: organs,
                loadState: LoadState.LOADED,
            });
        }
        catch (err) {
            console.error(err);
            this.setState({
                loadState: LoadState.ERROR,
                error: err
            });
        }
    }
}