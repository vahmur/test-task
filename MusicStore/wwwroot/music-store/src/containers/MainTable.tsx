import * as React from 'react';
import ReactTable from 'react-table';
import { DropdownList } from 'react-widgets';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface IMainTableProps {
    changeContainer: (data: IAppStates) => void;
}

interface IMainTableStates {
    errors: string;
    createItem: string;
    artists: Array<any>;
    albums: Array<any>;
    tableData: Array<any>;
    filterValue: string;
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

/*
 * Main music store data table
 */
class MainTable extends React.Component<IMainTableProps, IMainTableStates> {

    constructor(props: IMainTableProps) {
        super(props);

        this.state = {
            errors: "",
            createItem: "artist",
            artists: [],
            albums: [],
            tableData: [],
            filterValue: "",
        };
    }

    /*
     * Filter value change handler
     */
    private handleFilterChange: (event: any) => void = (event) => {
        this.setState({ filterValue: event.target.value || "" });
    };

    /*
     * Search field enter key press
     */
    private handlefilterKeyPress: (event: any) => void = (e) => {
        if (e.key === 'Enter') {
            this.getMusicStore();
        }
    }

    public componentWillMount() {

        this.getMusicStore();

        /* Get artist list from API */
        axios.get('/api/Artists')
            .then((res: AxiosResponse) => {
                this.setState({ artists: res.data, errors: "" });
            })
            .catch((error: AxiosError) => {
                this.setState({ errors: "Can't retreive artists API" });
            });

        /* Get album list from API */
        axios.get('/api/Albums')
            .then((res: AxiosResponse) => {
                this.setState({ albums: res.data, errors: "" });
            })
            .catch((error: AxiosError) => {
                this.setState({ errors: "Can't retreive albums API" });
            });
    }

    /*
     * Redirect to edit/create page
     */
    private editOrCreateRecord: (action: string, recordType: string, data: any) => void = (action, recordType, data) => {
        this.props.changeContainer({ display: "EditPage", data: { action: action, recordType: recordType, data: data } })
    };

    /*
     * Change type of data to create
     */
    private createItemListChange: (data: any) => void = (data) => {
        this.setState({ createItem: data });
    }

    /*
     * Get table data from api
     */
    private getMusicStore: () => void = () => {

        let params: any = {
            params: {}
        }

        if (this.state.filterValue) {
            params.params.filterValue = this.state.filterValue;
        }

        axios.get('/api/Store', params)
            .then((res: AxiosResponse) => {
                this.setState({ tableData: res.data, errors: "" });
            })
            .catch((error: AxiosError) => {
                this.setState({ errors: "Can't retreive records from API" });
            });
    }

    /*
     * Hm...render function 8)
     */
    render(): JSX.Element {

        let recordTypes = ['artist', 'album', 'track'];

        const columns: Array<any> = [
            {
                Header: '#',
                Cell: (data: any) => <span>{data.index + 1}</span>,
                maxWidth: 50
            },
            {
                Header: 'Artist',
                accessor: 'artistName',
                Cell: (data: any) => <a className="pointee" title="Edit artist" onClick={() => this.editOrCreateRecord("edit", "artist", { ...data.original, artists: this.state.artists, albums: this.state.albums })}>{data.value}</a>
            },
            {
                Header: 'Album',
                accessor: 'albumName',
                Cell: (data: any) => <a className="pointee" title="Edit album" onClick={() => this.editOrCreateRecord("edit", "album", { ...data.original, artists: this.state.artists, albums: this.state.albums })}>{data.value}</a>
            },
            {
                Header: 'Track',
                accessor: 'trackName',
                Cell: (data: any) => <a className="pointee" title="Edit track" onClick={() => this.editOrCreateRecord("edit", "track", { ...data.original, artists: this.state.artists, albums: this.state.albums })}>{data.value}</a>
            },
        ];

        return (
            <div>
                <div className="text-danger">{this.state.errors}</div>
                <div className="row">
                    <div className="jumbotron action-panel">
                        <div className="col-md-6">
                            <div className="col-md-8">
                                <DropdownList
                                    data={recordTypes}
                                    defaultValue={"artist"}
                                    onChange={this.createItemListChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-default" onClick={() => this.editOrCreateRecord("create", this.state.createItem, { artists: this.state.artists, albums: this.state.albums })}>Create</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="col-md-12">
                                <div className="input-group stylish-input-group">
                                    <input type="text" className="form-control" placeholder="Search" onChange={this.handleFilterChange} value={this.state.filterValue} onKeyPress={this.handlefilterKeyPress} />
                                    <span className="input-group-addon">
                                        <button type="submit" onClick={this.getMusicStore}>
                                            <span className="glyphicon glyphicon-search" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ReactTable
                        data={this.state.tableData}
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