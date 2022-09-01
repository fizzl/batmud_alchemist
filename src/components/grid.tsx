import React from 'react';
import { isConstructorDeclaration } from 'typescript';
import { Herb, Herbs } from '../types/herbs';
import { IIngredient, IIngredientList, selectIngredientType } from '../types/ingredient';
import { Material } from '../types/materials';
import { Organ, Organs } from '../types/organs';
import { Node } from './node';

interface IGridProps {
    indexIngredient: IIngredient
    axisXIngredients: IIngredientList,
    axisYIngredients: IIngredientList
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
                <tbody>
                {this.renderHeader()}
                {this.props.axisYIngredients.list.map((iy: IIngredient) => {
                    return (<tr>
                        <th>{iy.toString()}</th>
                        {
                            this.props.axisXIngredients.list.map((ix: IIngredient) => {
                                const material = selectIngredientType(Material.name,
                                    ii, ix, iy);
                                const herb = selectIngredientType(Herb.name,
                                    ii, ix, iy);
                                const organ = selectIngredientType(Organ.name,
                                    ii, ix, iy);
                                return <td><Node key={ii.toString() + ix.toString() + iy.toString()} material={material} herb={herb} organ={organ} /></td>
                            })

                        }
                    </tr>);
                })}
                </tbody>
            </table>
        );
    }
    renderHeader() {
        return (
            <tr>
                <th>&nbsp;</th>
                {this.props.axisXIngredients.list.map((i: IIngredient) => {
                    return <th key={i.toString()}>{i.toString()}</th>;
                })}
            </tr>
        )
    }
    async componentDidMount() {
        console.log('Grid componentDidMount', this.props);
    }
}