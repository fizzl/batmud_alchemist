import './material_list.css';
import React from 'react';
import { Herbs } from '../types/herbs';
import { Materials } from '../types/materials';
import { Organs } from '../types/organs';
import { LoadState } from '../utils/load_state';
import { Grid } from './grid';
import { IIngredient, IIngrediententList } from '../types/ingredient';

interface IMaterialListProps {
    indexIngredients: IIngrediententList;
    axisXInrgedients: IIngrediententList;
    axisyIngredients: IIngrediententList;
    loadState: LoadState;
}

interface IMaterialListState {
    selectedIndex?: IIngredient;
}

export class MaterialList extends React.Component<IMaterialListProps, IMaterialListState> {
    constructor(props: IMaterialListProps) {
        super(props);
    }
    render() {
        switch(this.props.loadState) {
            case LoadState.INITIAL:
                return <div>Init...</div>;
            case LoadState.LOADING:
                return <div>Loading...</div>;
            case LoadState.ERROR:
                return <div>Error...</div>;
            case LoadState.LOADED:
                return this.renderLoaded();
        }
    }
    renderLoaded() {
        const buttons = this.props.indexIngredients.list.map((i: IIngredient) => {
            const classname = i.name === this.state.selectedIndex?.name ? 'button-selected' : 'button-normal';
            return (
                <button 
                    key={i.name} 
                    className={classname}
                    onClick={() => this.onMaterialClick(i)}>
                        {i.toString()}
                </button>
                );
        });
        const tab = this.props.indexIngredients.list.map((i) => {
            if(i.name === this.state.selectedIndex?.name) {
                return <Grid key={i.name} material={material} herbs={this.state.herbs} organs={this.state.organs} />;
            }
        });
        return (
            <div className="container">
                <div className='button_container'>{buttons}</div>
                <div className='grid_container'></div>{tab}
            </div>
        )
    }
    onMaterialClick(material: IMaterial) {
        this.setState({
            selectedMaterial: material,
        });
    }
}