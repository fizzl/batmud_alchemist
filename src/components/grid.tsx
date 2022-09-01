import React from 'react';
import { Herb, Herbs } from '../types/herbs';
import { IIngredient, IIngrediententList } from '../types/ingredient';
import { Material } from '../types/materials';
import { Organ, Organs } from '../types/organs';
import { Node } from './node';

interface IGridProps {
    indexIngredient: IIngredient
    axisXIngredients: IIngrediententList,
    axisYIngredients: IIngrediententList
}
interface IGridState {
}

export class Grid extends React.Component<IGridProps, IGridState> {
    constructor(props: IGridProps) {
        super(props);
    }
    render() {
        const ii = this.props.indexIngredient;
        return (
            <table border={1}>
                {this.renderHeader()}
                {this.props.axisXIngredients.list.map((ix: IIngredient) => {
                    return(<tr>
                        <th>{ix.toString()}</th>
                        {
                            this.props.axisXIngredients.list.map((iy: IIngredient) => {
                                
                                return <td><Node key={ix.toString() + iy.toString()} material={material} herb={herb} organ={organ} /></td>
                            })

                        }
                    </tr>);
                })}
            </table>
        );
    }
    renderHeader() {
        return(
            <tr>
                <th>&nbsp;</th>
                {this.props.organs.organs.map((organ: Organ) => {
                    return <th key={organ.toString()}>{organ.toString()}</th>;
                })}
            </tr>
        )
    }
    async componentDidMount() {
        console.log('Grid componentDidMount', this.props);
    }
}