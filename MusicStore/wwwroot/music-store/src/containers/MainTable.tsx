import * as React from 'react';
import ReactTable from 'react-table';
import { DropdownList } from 'react-widgets';

interface IMainTableProps {
    changeContainer: (data: IAppStates) => void;
}

interface IMainTableStates {
    createItem: string;
    artists: Array<any>;
    albums: Array<any>;
}

interface IAppStates {
    display: string;
    data: IEditRecordData;
}

interface IEditRecordData {
    action: string;
    recordType: string;
    data?: any;
}

class MainTable extends React.PureComponent<IMainTableProps, IMainTableStates> {

    constructor(props: IMainTableProps) {
        super(props);

        this.state = {
            createItem: "artist",
            artists: [{ ArtistID: 1, ArtistName: 'Metallica' }, { ArtistID: 2, ArtistName: 'Slayer' }],
            albums: [{ AlbumID: 1, AlbumName: 'SomeAlbum' }, { AlbumID: 2, AlbumName: 'SomeAlbum2' },],
        };
    }

    private editOrCreateRecord: (action: string, recordType: string, data: any) => void = (action, recordType, data) => {

        this.props.changeContainer({ display: "EditPage", data: { action: action, recordType: recordType, data: data } })
    };

    private createItemLIstChange: (data: any) => void = (data) => {
        this.setState({ createItem: data });
    }

    render(): JSX.Element {

        let recordTypes = ['artist', 'album', 'track'];

        const data = [
            {
                ArtistID: 11,
                ArtistName: 'Metallica',
                AlbumID: 12,
                AlbumName: 'Black Album',
                TrackID: 122,
                TrackName: 'Some super track'
            },
            {
                ArtistID: 11,
                ArtistName: 'Metallica',
                AlbumID: 12,
                AlbumName: 'Black Album',
                TrackID: 122,
                TrackName: 'Some super track'
            },
            {
                ArtistID: 11,
                ArtistName: 'Metallica',
                AlbumID: 12,
                AlbumName: 'Black Album',
                TrackID: 122,
                TrackName: 'Some super track'
            },
            {
                ArtistID: 11,
                ArtistName: 'Metallica',
                AlbumID: 12,
                AlbumName: 'Black Album',
                TrackID: 122,
                TrackName: 'Some super track'
            },
            {
                ArtistID: 11,
                ArtistName: 'Metallica',
                AlbumID: 12,
                AlbumName: 'Black Album',
                TrackID: 122,
                TrackName: 'Some super track'
            },
            {
                ArtistID: 11,
                ArtistName: 'Metallica',
                AlbumID: 12,
                AlbumName: 'Black Album',
                TrackID: 122,
                TrackName: 'Some super track'
            },
        ]

        const columns = [
            {
                Header: '#',
                Cell: (data: any) => <span>{data.index + 1}</span>,
                maxWidth: 50
            },
            {
                Header: 'Artist',
                accessor: 'ArtistName',
                Cell: (data: any) => <a className="pointee" title="Edit artist" onClick={() => this.editOrCreateRecord("edit", "artist", { ...data.original, artists: this.state.artists, albums: this.state.albums })}>{data.value}</a>
            },
            {
                Header: 'Album',
                accessor: 'AlbumName',
                Cell: (data: any) => <a className="pointee" title="Edit album" onClick={() => this.editOrCreateRecord("edit", "album", { ...data.original, artists: this.state.artists, albums: this.state.albums })}>{data.value}</a>
            },
            {
                Header: 'Track',
                accessor: 'TrackName',
                Cell: (data: any) => <a className="pointee" title="Edit track" onClick={() => this.editOrCreateRecord("edit", "track", { ...data.original, artists: this.state.artists, albums: this.state.albums })}>{data.value}</a>
            },
        ];

        return (
            <div>
                <div className="row">
                    <div className="jumbotron action-panel">
                        <div className="col-md-6">
                            <div className="col-md-8">
                                <DropdownList
                                    data={recordTypes}
                                    defaultValue={"artist"}
                                    onChange={this.createItemLIstChange}
                                />
                            </div>
                            <button className="btn btn-default" onClick={() => this.editOrCreateRecord("create", this.state.createItem, { artists: this.state.artists, albums: this.state.albums })}>Create</button>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group stylish-input-group">
                                <input type="text" className="form-control" placeholder="Search" />
                                <span className="input-group-addon">
                                    <button type="submit">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ReactTable
                        data={data}
                        columns={columns}
                        defaultPageSize={10}
                        pageSizeOptions={[5, 10, 20, 25, 50]}
                    />
                </div>
            </div >
        );
    }
}

export default MainTable;