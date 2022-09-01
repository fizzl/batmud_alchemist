import React from 'react';
import { Herb } from '../types/herbs';
import { Material } from '../types/materials';
import { Organ } from '../types/organs';

interface INodeProps {
    material: Material
    herb: Herb
    organ: Organ
}
interface INodeState {
}

export class Node extends React.Component<INodeProps, INodeState> {
    constructor(props: INodeProps) {
        super(props);
    }
    render() {
        return (
            <div className="Node">-
            </div>
        );
    }
    componentDidMount() {
        //console.log('Node componentDidMount', this.props);
    }
}