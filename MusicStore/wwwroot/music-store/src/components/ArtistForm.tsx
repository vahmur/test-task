import * as React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

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
    artistName: string;
    artistNameError: string;
}

/*
 * Artist create/update/delete form
 */
class ArtistForm extends React.PureComponent<IArtistFormProps, IArtistFormStates> {

    constructor(props: IArtistFormProps) {
        super(props);

        this.state = {
            error: "",
            artistName: (this.props.data.action === "edit") ? this.props.data.data.artistName : "",
            artistNameError: "",
        };
    }

    /*
     * Create artist
     */
    private createRecord(): void {
        const params = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        axios.post('/api/Artists', JSON.stringify({ name: this.state.artistName }), params)
            .then((res: AxiosResponse) => {
                this.props.changeContainer({ display: "MainTable", data: {} });
            })
            .catch((error: AxiosError) => {
                this.setState({ error: "Can't create artist" });
            });
    }

    /*
     * Edit artist
     */
    private editRecord(): void {
        const params = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        axios.put('/api/Artists/' + this.props.data.data.artistID, JSON.stringify({ ArtistID: this.props.data.data.artistID, name: this.state.artistName }), params)
            .then((res: AxiosResponse) => {
                this.props.changeContainer({ display: "MainTable", data: {} });
            })
            .catch((error: AxiosError) => {
                this.setState({ error: "Can't edit artist" });
            });
    }

    /*
     * Delete artist
     */
    private deleteRecord: () => void = () => {
        axios.delete('/api/Artists/' + this.props.data.data.artistID)
            .then((res: AxiosResponse) => {
                this.props.changeContainer({ display: "MainTable", data: {} });
            })
            .catch((error: AxiosError) => {
                this.setState({ error: "Can't delete artist" });
            });
    }

    /*
     * Save button click handler
     */
    private handleSaveData: (event: any) => void = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.state.artistName) {
            this.setState({ artistNameError: "Required!" })
        } else {
            if (this.props.data.action === "edit") {
                this.editRecord();
            } else {
                this.createRecord();
            }
        }
    }

    private handleNameChange: (event: any) => void = (event) => {
        this.setState({ artistName: event.target.value });
    };

    render(): JSX.Element {

        const artistID: JSX.Element | null = (this.props.data.action === "edit") ?
            (
                <div className="form-group">
                    <label htmlFor="artistID">Artist id*</label>
                    <input className="form-control" id="artistID" value={this.props.data.data.artistID} readOnly={true} />
                </div>
            )
            :
            null;

        const deleteButton: JSX.Element | null = (this.props.data.action === "edit") ?
            (
                <a className="btn btn-danger btn-delete" onClick={this.deleteRecord}>Delete</a>
            )
            :
            null;

        return (
            <form>
                <div className="text-danger">{this.state.error}</div>
                {artistID}
                <div className="form-group">
                    <label htmlFor="artistName">Artist name*</label>
                    <input className="form-control" id="artistName" placeholder="Enter artist name" onChange={this.handleNameChange} value={this.state.artistName} />
                    <small className="form-text text-muted text-danger">{this.state.artistNameError}</small>
                </div>
                <a className="btn btn-primary" onClick={this.handleSaveData}>Save</a>
                {deleteButton}
            </form>
        );
    }
}

export default ArtistForm;