import * as React from 'react';

interface IArtistFormProps {
    changeContainer: (data: IAppStates) => void;
    data: IEditRecordData;
}

interface IEditRecordData {
    action?: "edit" | "create";
    recordType?: "artist" | "album" | "track";
    data?: any;
}

interface IAppStates {
    display: string;
    data: any;
}

interface IArtistFormStates {
    error: string;
    ArtistName: string;
    ArtistNameError: string;
}

class ArtistForm extends React.PureComponent<IArtistFormProps, IArtistFormStates> {

    constructor(props: IArtistFormProps) {
        super(props);

        this.state = {
            error: "",
            ArtistName: (this.props.data.action === "edit") ? this.props.data.data.ArtistName : "",
            ArtistNameError: "",
        };
    }

    private createRecord(data: any): void {
        this.props.changeContainer({ display: "MainTable", data: {} });
        // TODO: save data here
        // if(error) this.setState({error: "simeErrror"})
    }

    private editRecord(data: any): void {
        this.props.changeContainer({ display: "MainTable", data: {} });
        // TODO: save data here
        // if(error) this.setState({error: "simeErrror"})
    }

    private saveData: (event: any) => void = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.state.ArtistName) {
            this.setState({ ArtistNameError: "Required!" })
        } else {
            if (this.props.data.action === "edit") {
                this.editRecord({});
            }
            else {
                this.createRecord({});
            }
        }
    }

    private handleNameChange: (event: any) => void = (event) => {
        this.setState({ ArtistName: event.target.value });
    };

    render(): JSX.Element {

        const ArtistID: JSX.Element | null = (this.props.data.action === "edit") ?
            (
                <div className="form-group">
                    <label htmlFor="ArtistID">Artist id*</label>
                    <input className="form-control" id="ArtistID" value={this.props.data.data.ArtistID} disabled={true} />
                </div>
            )
            :
            null;

        return (
            <form>
                <div className="text-danger">{this.state.error}</div>
                {ArtistID}
                <div className="form-group">
                    <label htmlFor="ArtistName">Artist name*</label>
                    <input
                        className="form-control"
                        id="ArtistName"
                        placeholder="Enter artist name"
                        onChange={this.handleNameChange} value={this.state.ArtistName}
                    />
                    <small className="form-text text-muted text-danger">{this.state.ArtistNameError}</small>
                </div>
                <a className="btn btn-primary" onClick={this.saveData}>Save</a>
            </form>
        );
    }
}

export default ArtistForm;