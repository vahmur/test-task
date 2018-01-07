import * as React from 'react';
import { DropdownList } from 'react-widgets';

interface ITrackFromProps {
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
    AlbumID: number;
    AlbumIDError: string;
    TrackName: string;
    TrackNameError: string;
}

class TrackFrom extends React.PureComponent<ITrackFromProps, IArtistFormStates> {

    constructor(props: ITrackFromProps) {
        super(props);

        this.state = {
            error: "",
            AlbumID: (this.props.data.action === "edit") ? this.props.data.data.AlbumID : null,
            AlbumIDError: "",
            TrackName: (this.props.data.action === "edit") ? this.props.data.data.TrackName : "",
            TrackNameError: "",
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

        if (!this.state.AlbumID) {
            this.setState({ AlbumIDError: "Required!" });
            error = true;
        }

        if (!this.state.TrackName) {
            this.setState({ TrackNameError: "Required!" });
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
        this.setState({ TrackName: event.target.value });
    };

    private handleIDChange: (value: any) => void = (value) => {
        this.setState({ AlbumID: value.AlbumID });
    };

    render(): JSX.Element {

        const TrackID: JSX.Element | null = (this.props.data.action === "edit") ?
            (
                <div className="form-group">
                    <label htmlFor="TrackID">Track id*</label>
                    <input className="form-control" id="TrackID" value={this.props.data.data.TrackID} disabled={true} />
                </div>
            )
            :
            null;

        return (
            <form>
                <div className="text-danger">{this.state.error}</div>
                {TrackID}
                <div className="form-group">
                    <label htmlFor="AlbumID">Album*</label>
                    <DropdownList
                        placeholder="Select album"
                        onChange={this.handleIDChange}
                        data={this.props.data.data.albums}
                        textField={'AlbumName'}
                        valueField={'AlbumID'}
                        defaultValue={this.state.AlbumID}
                    />
                    <small className="form-text text-muted text-danger">{this.state.AlbumIDError}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="TrackName">Track name*</label>
                    <input
                        className="form-control"
                        id="TrackName"
                        placeholder="Enter track name"
                        onChange={this.handleNameChange} value={this.state.TrackName}
                    />
                    <small className="form-text text-muted text-danger">{this.state.TrackNameError}</small>
                </div>
                <a className="btn btn-primary" onClick={this.saveData}>Save</a>
            </form>
        );
    }
}

export default TrackFrom;