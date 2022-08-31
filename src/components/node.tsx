import React from 'react';
import { IHerb } from '../types/herbs';
import { IMaterial } from '../types/materials';
import { IOrgan } from '../types/organs';

interface INodeProps {
    material: IMaterial
    herb: IHerb
    organ: IOrgan
}
interface INodeState {
}

export class Node extends React.Component<INodeProps, INodeState> {
    constructor(props: INodeProps) {
        super(props);
    }
    render() {
        return (
            <div className="Node">
                {this.props.material.toString()}
                {this.props.herb.toString()}
                {this.props.organ.toString()}
            </div>
        );
    }
    componentDidMount() {
        console.log('Node componentDidMount', this.props);
    }
}