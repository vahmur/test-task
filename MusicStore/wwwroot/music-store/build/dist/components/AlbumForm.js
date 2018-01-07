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
import * as React from 'react';
import { DropdownList } from 'react-widgets';
var AlbumForm = /** @class */ (function (_super) {
    __extends(AlbumForm, _super);
    function AlbumForm(props) {
        var _this = _super.call(this, props) || this;
        _this.saveData = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var error = false;
            if (!_this.state.artistID) {
                _this.setState({ artistIDError: "Required!" });
                error = true;
            }
            else {
                if (_this.state.artistIDError) {
                    _this.setState({ artistIDError: "" });
                }
            }
            if (!_this.state.albumName) {
                _this.setState({ albumNameError: "Required!" });
                error = true;
            }
            else {
                if (_this.state.albumNameError) {
                    _this.setState({ albumNameError: "" });
                }
            }
            if (!error) {
                if (_this.props.data.action === "edit") {
                    _this.editRecord({});
                }
                else {
                    _this.createRecord({});
                }
            }
        };
        _this.handleNameChange = function (event) {
            _this.setState({ albumName: event.target.value });
        };
        _this.handleIDChange = function (value) {
            _this.setState({ artistID: value.artistID });
        };
        _this.state = {
            error: "",
            artistID: (_this.props.data.action === "edit") ? _this.props.data.data.artistID : null,
            artistIDError: "",
            albumName: (_this.props.data.action === "edit") ? _this.props.data.data.albumName : "",
            albumNameError: "",
        };
        return _this;
    }
    AlbumForm.prototype.createRecord = function (data) {
        this.props.changeContainer({ display: "MainTable", data: {} });
        // TODO: save data here
        // if(error) this.setState({error: "simeErrror"})
    };
    AlbumForm.prototype.editRecord = function (data) {
        this.props.changeContainer({ display: "MainTable", data: {} });
        // TODO: save data here
        // if(error) this.setState({error: "simeErrror"})
    };
    AlbumForm.prototype.render = function () {
        var albumID = (this.props.data.action === "edit") ?
            (React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "albumID" }, "Album id*"),
                React.createElement("input", { className: "form-control", id: "albumID", value: this.props.data.data.albumID, readOnly: true })))
            :
                null;
        return (React.createElement("form", null,
            React.createElement("div", { className: "text-danger" }, this.state.error),
            albumID,
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "artistID" }, "Artist*"),
                React.createElement(DropdownList, { placeholder: "Select artist", onChange: this.handleIDChange, data: this.props.data.data.artists, textField: 'name', valueField: 'artistID', defaultValue: this.state.artistID }),
                React.createElement("small", { className: "form-text text-muted text-danger" }, this.state.artistIDError)),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "albumName" }, "Album name*"),
                React.createElement("input", { className: "form-control", id: "albumName", placeholder: "Enter album name", onChange: this.handleNameChange, value: this.state.albumName }),
                React.createElement("small", { className: "form-text text-muted text-danger" }, this.state.albumNameError)),
            React.createElement("a", { className: "btn btn-primary", onClick: this.saveData }, "Save")));
    };
    return AlbumForm;
}(React.PureComponent));
export default AlbumForm;
//# sourceMappingURL=AlbumForm.js.map