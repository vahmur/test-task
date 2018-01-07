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
    artistID: number;
    artistIDError: string;
    albumName: string;
    albumNameError: string;
}

class AlbumForm extends React.PureComponent<IAlbumFormProps, IArtistFormStates> {

    constructor(props: IAlbumFormProps) {
        super(props);

        this.state = {
            error: "",
            artistID: (this.props.data.action === "edit") ? this.props.data.data.artistID : null,
            artistIDError: "",
            albumName: (this.props.data.action === "edit") ? this.props.data.data.albumName : "",
            albumNameError: "",
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

        if (!this.state.artistID) {
            this.setState({ artistIDError: "Required!" });
            error = true;
        } else {
            if (this.state.artistIDError) {
                this.setState({ artistIDError: "" });
            }
        }

        if (!this.state.albumName) {
            this.setState({ albumNameError: "Required!" });
            error = true;
        } else {
            if (this.state.albumNameError) {
                this.setState({ albumNameError: "" });
            }
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
        this.setState({ albumName: event.target.value });
    };

    private handleIDChange: (value: any) => void = (value) => {
        this.setState({ artistID: value.artistID });
    };

    render(): JSX.Element {

        const albumID: JSX.Element | null = (this.props.data.action === "edit") ?
            (
                <div className="form-group">
                    <label htmlFor="albumID">Album id*</label>
                    <input className="form-control" id="albumID" value={this.props.data.data.albumID} readOnly={true} />
                </div>
            )
            :
            null;

        return (
            <form>
                <div className="text-danger">{this.state.error}</div>
                {albumID}
                <div className="form-group">
                    <label htmlFor="artistID">Artist*</label>
                    <DropdownList
                        placeholder="Select artist"
                        onChange={this.handleIDChange}
                        data={this.props.data.data.artists}
                        textField={'name'}
                        valueField={'artistID'}
                        defaultValue={this.state.artistID}
                    />
                    <small className="form-text text-muted text-danger">{this.state.artistIDError}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="albumName">Album name*</label>
                    <input
                        className="form-control"
                        id="albumName"
                        placeholder="Enter album name"
                        onChange={this.handleNameChange} value={this.state.albumName}
                    />
                    <small className="form-text text-muted text-danger">{this.state.albumNameError}</small>
                </div>
                <a className="btn btn-primary" onClick={this.saveData}>Save</a>
            </form>
        );
    }
}

export default AlbumForm;