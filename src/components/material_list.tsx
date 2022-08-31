import './material_list.css';
import React from 'react';
import { Herbs } from '../types/herbs';
import { IMaterial, Materials } from '../types/materials';
import { Organs } from '../types/organs';
import { LoadState } from '../utils/load_state';
import { Grid } from './grid';

interface IMaterialListProps {
}

interface IMaterialListState {
    materials: Materials;
    herbs: Herbs;
    organs: Organs;
    selectedMaterial?: IMaterial;
    loadState: LoadState;
    error?: any;
}

export class MaterialList extends React.Component<IMaterialListProps, IMaterialListState> {
    constructor(props: IMaterialListProps) {
        super(props);
        this.state = {
            materials: new Materials(),
            herbs: new Herbs(),
            organs: new Organs(),
            loadState: LoadState.INITIAL,
        }
    }
    render() {
        switch(this.state.loadState) {
            case LoadState.INITIAL:
                return <div>Init...</div>;
            case LoadState.LOADING:
                return <div>Loading...</div>;
            case LoadState.ERROR:
                return <div>Error: {this.state.error}</div>;
            case LoadState.LOADED:
                return this.renderLoaded();

        }
    }
    renderLoaded() {
        const buttons = this.state.materials.materials.map((material: IMaterial) => {
            const classname = material.name === this.state.selectedMaterial?.name ? 'button-selected' : 'button-normal';
            return (
                <button 
                    key={material.name} 
                    className={classname}
                    onClick={() => this.onMaterialClick(material)}>
                        {material.name}
                </button>
                );
        });
        const tab = this.state.materials.materials.map((material) => {
            if(material.name === this.state.selectedMaterial?.name) {
                return <Grid key={material.name} material={material} herbs={this.state.herbs} organs={this.state.organs} />;
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
                selectedMaterial: this.state.materials.materials[0]
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