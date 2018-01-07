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
var TrackFrom = /** @class */ (function (_super) {
    __extends(TrackFrom, _super);
    function TrackFrom(props) {
        var _this = _super.call(this, props) || this;
        _this.saveData = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var error = false;
            if (!_this.state.albumID) {
                _this.setState({ albumIDError: "Required!" });
                error = true;
            }
            else {
                if (_this.state.albumIDError) {
                    _this.setState({ albumIDError: "" });
                }
            }
            if (!_this.state.trackName) {
                _this.setState({ trackNameError: "Required!" });
                error = true;
            }
            else {
                if (_this.state.trackNameError) {
                    _this.setState({ trackNameError: "" });
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
            _this.setState({ trackName: event.target.value });
        };
        _this.handleIDChange = function (value) {
            _this.setState({ albumID: value.albumID });
        };
        _this.state = {
            error: "",
            albumID: (_this.props.data.action === "edit") ? _this.props.data.data.albumID : null,
            albumIDError: "",
            trackName: (_this.props.data.action === "edit") ? _this.props.data.data.trackName : "",
            trackNameError: "",
        };
        return _this;
    }
    TrackFrom.prototype.createRecord = function (data) {
        this.props.changeContainer({ display: "MainTable", data: {} });
        // TODO: save data here
        // if(error) this.setState({error: "simeErrror"})
    };
    TrackFrom.prototype.editRecord = function (data) {
        this.props.changeContainer({ display: "MainTable", data: {} });
        // TODO: save data here
        // if(error) this.setState({error: "simeErrror"})
    };
    TrackFrom.prototype.render = function () {
        var trackID = (this.props.data.action === "edit") ?
            (React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "trackID" }, "Track id*"),
                React.createElement("input", { className: "form-control", id: "trackID", value: this.props.data.data.trackID, readOnly: true })))
            :
                null;
        return (React.createElement("form", null,
            React.createElement("div", { className: "text-danger" }, this.state.error),
            trackID,
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "albumID" }, "Album*"),
                React.createElement(DropdownList, { placeholder: "Select album", onChange: this.handleIDChange, data: this.props.data.data.albums, textField: 'albumName', valueField: 'albumID', defaultValue: this.state.albumID }),
                React.createElement("small", { className: "form-text text-muted text-danger" }, this.state.albumIDError)),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "trackName" }, "Track name*"),
                React.createElement("input", { className: "form-control", id: "trackName", placeholder: "Enter track name", onChange: this.handleNameChange, value: this.state.trackName }),
                React.createElement("small", { className: "form-text text-muted text-danger" }, this.state.trackNameError)),
            React.createElement("a", { className: "btn btn-primary", onClick: this.saveData }, "Save")));
    };
    return TrackFrom;
}(React.PureComponent));
export default TrackFrom;
//# sourceMappingURL=TrackForm.js.map