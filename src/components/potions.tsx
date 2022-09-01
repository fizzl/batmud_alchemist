import React from "react";
import { Herb, Herbs } from '../types/herbs';
import { IIngrediententList } from "../types/ingredient";
import { Material, Materials } from '../types/materials';
import { Organ, Organs } from '../types/organs';
import { LoadState } from "../utils/load_state";
import { MaterialList } from "./material_list";
import { Node } from './node';

interface IPotionsProps {
}
interface IPotionsState {
    materials: IIngrediententList;
    herbs: IIngrediententList;
    organs: IIngrediententList;
    loadState: LoadState;
    error: any;
}

export class Potions extends React.Component<IPotionsProps, IPotionsState> {
    constructor(props: IPotionsProps) {
        super(props);
    }

    render() {
        return(
            <MaterialList/>
        )
    }
    async componentDidMount() {
        if(this.state.loadState !== LoadState.INITIAL) {
            return;
        }
        console.log('MaterialList componentDidMount', this.props);
        try {
            this.setState({
                loadState: LoadState.LOADING
            });
            this.setState({ 
                materials: await Materials.factory(),
                herbs: await Herbs.factory(),
                organs: await Organs.factory(),
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