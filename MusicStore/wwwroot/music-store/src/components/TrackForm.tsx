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
    albumID: number;
    albumIDError: string;
    trackName: string;
    trackNameError: string;
}

class TrackFrom extends React.PureComponent<ITrackFromProps, IArtistFormStates> {

    constructor(props: ITrackFromProps) {
        super(props);

        this.state = {
            error: "",
            albumID: (this.props.data.action === "edit") ? this.props.data.data.albumID : null,
            albumIDError: "",
            trackName: (this.props.data.action === "edit") ? this.props.data.data.trackName : "",
            trackNameError: "",
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

        if (!this.state.albumID) {
            this.setState({ albumIDError: "Required!" });
            error = true;
        }
        else {
            if (this.state.albumIDError) {
                this.setState({ albumIDError: "" });
            }
        }

        if (!this.state.trackName) {
            this.setState({ trackNameError: "Required!" });
            error = true;
        }
        else {
            if (this.state.trackNameError) {
                this.setState({ trackNameError: "" });
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
        this.setState({ trackName: event.target.value });
    };

    private handleIDChange: (value: any) => void = (value) => {
        this.setState({ albumID: value.albumID });
    };

    render(): JSX.Element {

        const trackID: JSX.Element | null = (this.props.data.action === "edit") ?
            (
                <div className="form-group">
                    <label htmlFor="trackID">Track id*</label>
                    <input className="form-control" id="trackID" value={this.props.data.data.trackID} readOnly={true} />
                </div>
            )
            :
            null;

        return (
            <form>
                <div className="text-danger">{this.state.error}</div>
                {trackID}
                <div className="form-group">
                    <label htmlFor="albumID">Album*</label>
                    <DropdownList
                        placeholder="Select album"
                        onChange={this.handleIDChange}
                        data={this.props.data.data.albums}
                        textField={'albumName'}
                        valueField={'albumID'}
                        defaultValue={this.state.albumID}
                    />
                    <small className="form-text text-muted text-danger">{this.state.albumIDError}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="trackName">Track name*</label>
                    <input
                        className="form-control"
                        id="trackName"
                        placeholder="Enter track name"
                        onChange={this.handleNameChange} value={this.state.trackName}
                    />
                    <small className="form-text text-muted text-danger">{this.state.trackNameError}</small>
                </div>
                <a className="btn btn-primary" onClick={this.saveData}>Save</a>
            </form>
        );
    }
}

export default TrackFrom;