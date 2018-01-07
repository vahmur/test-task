import * as React from 'react';
import { DropdownList } from 'react-widgets';

interface IAlbumFormProps {
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
    ArtistID: number;
    ArtistIDError: string;
    AlbumName: string;
    AlbumNameError: string;
}

class AlbumForm extends React.PureComponent<IAlbumFormProps, IArtistFormStates> {

    constructor(props: IAlbumFormProps) {
        super(props);

        this.state = {
            error: "",
            ArtistID: (this.props.data.action === "edit") ? this.props.data.data.ArtistID : null,
            ArtistIDError: "",
            AlbumName: (this.props.data.action === "edit") ? this.props.data.data.AlbumName : "",
            AlbumNameError: "",
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

        let error: boolean = false;

        if (!this.state.ArtistID) {
            this.setState({ ArtistIDError: "Required!" });
            error = true;
        }

        if (!this.state.AlbumName) {
            this.setState({ AlbumNameError: "Required!" });
            error = true;
        }

        if (!error) {
            if (this.props.data.action === "edit") {
                this.editRecord({});
            } else {
                this.createRecord({});
            }
        }
    }

    private handleNameChange: (event: any) => void = (event) => {
        this.setState({ AlbumName: event.target.value });
    };

    private handleIDChange: (value: any) => void = (value) => {
        this.setState({ ArtistID: value.ArtistID });
    };

    render(): JSX.Element {

        const AlbumID: JSX.Element | null = (this.props.data.action === "edit") ?
            (
                <div className="form-group">
                    <label htmlFor="AlbumID">Album id*</label>
                    <input className="form-control" id="AlbumID" value={this.props.data.data.AlbumID} disabled={true} />
                </div>
            )
            :
            null;

        return (
            <form>
                <div className="text-danger">{this.state.error}</div>
                {AlbumID}
                <div className="form-group">
                    <label htmlFor="ArtistID">Artist*</label>
                    <DropdownList
                        placeholder="Select artist"
                        onChange={this.handleIDChange}
                        data={this.props.data.data.artists}
                        textField={'ArtistName'}
                        valueField={'ArtistID'}
                        defaultValue={this.state.ArtistID}
                    />
                    <small className="form-text text-muted text-danger">{this.state.ArtistIDError}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="AlbumName">Album name*</label>
                    <input
                        className="form-control"
                        id="AlbumName"
                        placeholder="Enter album name"
                        onChange={this.handleNameChange} value={this.state.AlbumName}
                    />
                    <small className="form-text text-muted text-danger">{this.state.AlbumNameError}</small>
                </div>
                <a className="btn btn-primary" onClick={this.saveData}>Save</a>
            </form>
        );
    }
}

export default AlbumForm;