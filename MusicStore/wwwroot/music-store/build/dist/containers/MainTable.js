var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import ReactTable from 'react-table';
import { DropdownList } from 'react-widgets';
import axios from 'axios';
var MainTable = /** @class */ (function (_super) {
    __extends(MainTable, _super);
    function MainTable(props) {
        var _this = _super.call(this, props) || this;
        _this.editOrCreateRecord = function (action, recordType, data) {
            _this.props.changeContainer({ display: "EditPage", data: { action: action, recordType: recordType, data: data } });
        };
        _this.createItemLIstChange = function (data) {
            _this.setState({ createItem: data });
        };
        _this.getMusicStore = function () {
            axios.get('/api/Store')
                .then(function (res) {
                _this.setState({ tableData: res.data, errors: "" });
            })
                .catch(function (error) {
                _this.setState({ errors: "Can't retreive records from API" });
            });
        };
        _this.state = {
            errors: "",
            createItem: "artist",
            artists: [],
            albums: [],
            tableData: [],
        };
        return _this;
    }
    MainTable.prototype.componentWillMount = function () {
        var _this = this;
        this.getMusicStore();
        /* Get artist list from API */
        axios.get('/api/Artists')
            .then(function (res) {
            _this.setState({ artists: res.data, errors: "" });
        })
            .catch(function (error) {
            _this.setState({ errors: "Can't retreive artists API" });
        });
        /* Get album list from API */
        axios.get('/api/Albums')
            .then(function (res) {
            _this.setState({ albums: res.data, errors: "" });
        })
            .catch(function (error) {
            _this.setState({ errors: "Can't retreive albums API" });
        });
    };
    MainTable.prototype.render = function () {
        var _this = this;
        var recordTypes = ['artist', 'album', 'track'];
        var columns = [
            {
                Header: '#',
                Cell: function (data) { return React.createElement("span", null, data.index + 1); },
                maxWidth: 50
            },
            {
                Header: 'Artist',
                accessor: 'artistName',
                Cell: function (data) { return React.createElement("a", { className: "pointee", title: "Edit artist", onClick: function () { return _this.editOrCreateRecord("edit", "artist", __assign({}, data.original, { artists: _this.state.artists, albums: _this.state.albums })); } }, data.value); }
            },
            {
                Header: 'Album',
                accessor: 'albumName',
                Cell: function (data) { return React.createElement("a", { className: "pointee", title: "Edit album", onClick: function () { return _this.editOrCreateRecord("edit", "album", __assign({}, data.original, { artists: _this.state.artists, albums: _this.state.albums })); } }, data.value); }
            },
            {
                Header: 'Track',
                accessor: 'trackName',
                Cell: function (data) { return React.createElement("a", { className: "pointee", title: "Edit track", onClick: function () { return _this.editOrCreateRecord("edit", "track", __assign({}, data.original, { artists: _this.state.artists, albums: _this.state.albums })); } }, data.value); }
            },
        ];
        return (React.createElement("div", null,
            React.createElement("div", { className: "text-danger" }, this.state.errors),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "jumbotron action-panel" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "col-md-8" },
                            React.createElement(DropdownList, { data: recordTypes, defaultValue: "artist", onChange: this.createItemLIstChange })),
                        React.createElement("button", { className: "btn btn-default", onClick: function () { return _this.editOrCreateRecord("create", _this.state.createItem, { artists: _this.state.artists, albums: _this.state.albums }); } }, "Create")),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "input-group stylish-input-group" },
                            React.createElement("input", { type: "text", className: "form-control", placeholder: "Search" }),
                            React.createElement("span", { className: "input-group-addon" },
                                React.createElement("button", { type: "submit" },
                                    React.createElement("span", { className: "glyphicon glyphicon-search" }))))))),
            React.createElement("div", { className: "row" },
                React.createElement(ReactTable, { data: this.state.tableData, columns: columns, defaultPageSize: 10, pageSizeOptions: [5, 10, 20, 25, 50] }))));
    };
    return MainTable;
}(React.Component));
export default MainTable;
//# sourceMappingURL=MainTable.js.map