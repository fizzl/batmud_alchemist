import './material_list.css';
import React from 'react';
import { Herbs } from '../types/herbs';
import { Material, Materials } from '../types/materials';
import { Organs } from '../types/organs';
import { LoadState } from '../utils/load_state';
import { Grid } from './grid';
import { IIngredient, IIngredientList } from '../types/ingredient';

interface IMaterialListProps {
    indexIngredients: IIngredientList;
    axisXInrgedients: IIngredientList;
    axisYIngredients: IIngredientList;
    loadState: LoadState;
}

interface IMaterialListState {
    selectedIndex?: IIngredient;
}

export class MaterialList extends React.Component<IMaterialListProps, IMaterialListState> {
    constructor(props: IMaterialListProps) {
        super(props);
        this.state = {
            selectedIndex: undefined,
        }
    }
    componentDidUpdate(prevProps: IMaterialListProps) {
        if(this.props.indexIngredients.list.length > 0) {
            if(this.state.selectedIndex === undefined) {
                this.setState({
                    selectedIndex: this.props.indexIngredients.list[0]
                });
            }
            if(this.props.indexIngredients !== prevProps.indexIngredients) {
                this.setState({
                    selectedIndex: this.props.indexIngredients.list[0]
                });
            }
        }

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
        console.log(JSON.stringify(this.state));
        if(!this.state.selectedIndex) {
            return <div>Loading...</div>;
        }
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
                return <Grid key={i.name} 
                    indexIngredient={this.state.selectedIndex} 
                    axisXIngredients={this.props.axisXInrgedients}
                    axisYIngredients={this.props.axisYIngredients}/>;
            }
        });
        return (
            <div className="container">
                <div className='button_container'>{buttons}</div>
                <div className='grid_container'></div>{tab}
            </div>
        )
    }
    onMaterialClick(material: Material) {
        this.setState({
            selectedIndex: material,
        });
    }
}