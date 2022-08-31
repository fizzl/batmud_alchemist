import React from 'react';
import { Herb, Herbs } from '../types/herbs';
import { Material } from '../types/materials';
import { Organ, Organs } from '../types/organs';
import { Node } from './node';

interface IGridProps {
    material: Material
    herbs: Herbs,
    organs: Organs
}
interface IGridState {
}

export class Grid extends React.Component<IGridProps, IGridState> {
    constructor(props: IGridProps) {
        super(props);
    }
    render() {
        const material = this.props.material;
        return (
            <table border={1}>
                {this.renderHeader()}
                {this.props.herbs.herbs.map((herb: Herb) => {
                    return(<tr>
                        <th>{herb.toString()}</th>
                        {
                            this.props.organs.organs.map((organ: Organ) => {
                                return <td><Node key={herb.toString() + organ.toString()} material={material} herb={herb} organ={organ} /></td>
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