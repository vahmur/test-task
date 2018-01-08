import * as React from 'react';
import ArtistForm from '../components/ArtistForm';
import AlbumForm from '../components/AlbumForm';
import TrackForm from '../components/TrackForm';

interface EditRecordProps {
    changeContainer: (data: IAppStates) => void;
    data: EditRecordData;
}

interface EditRecordData {
    action?: "edit" | "create";
    recordType?: "artist" | "album" | "track";
    data?: any;
}

interface IAppStates {
    display: string;
    data: any;
}

/*
 * Record create/update/delete form container
 */
class EditRecord extends React.PureComponent<EditRecordProps, any> {

    constructor(props: EditRecordProps) {
        super(props);
    }

    render(): JSX.Element {

        const headingText: string = (this.props.data.action === "edit") ?
            `Edit ${this.props.data.recordType}`
            :
            `Create new ${this.props.data.recordType}`;

        let currentForm: JSX.Element;

        switch (this.props.data.recordType) {
            case "artist":
                currentForm = <ArtistForm {...this.props} />
                break;
            case "album":
                currentForm = <AlbumForm {...this.props} />
                break;
            default:
                currentForm = <TrackForm {...this.props} />
                break;
        }

        return (
            <div>
                <a className="backlink" onClick={() => this.props.changeContainer({ display: "MainTable", data: {} })}>{'< Back to record list'}</a>
                <div className="panel panel-default">
                    <div className="panel-heading">{headingText}</div>
                    <div className="panel-body">
                        {currentForm}
                    </div>
                </div>
            </div >
        );
    }
}

export default EditRecord;