import React from "react";

interface IDataSourceProps {
}

interface IDataSourceState {
    error?: any
}

export class DataSource extends React.Component<IDataSourceProps, IDataSourceState> {
    constructor(props: IDataSourceProps) {
        super(props);
        this.state = {
        };

    }
    render() {
        return (
            <div>
                <h1>DataSource</h1>
                <div>
                    <label>GgrTF Alchemist Results</label>
                    <input type="file" onChange={e => this.ggrFileSelected(e)}/>
                </div>
                <div hidden={!this.state.error}>
                    {this.state.error}
                </div>
            </div>
        );
    }
    ggrFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
        if(!e.target.files || e.target.files.length < 1) {
            this.setState({
                error: 'No file selected'
            });
            return;
        }
        const file = e.target.files[0];
        if(file.type !== 'text/plain') {
            this.setState({
                error: 'File must be a text file'
            });
            return;
        }
        console.log('ggrFileSelected', file);
        const fr = new FileReader();
        fr.onload = (e) => {
            console.log('fr.onload', e.target?.result);
            this.setState({
                error: undefined
            });
        }
        fr.readAsText(file);
    }
}