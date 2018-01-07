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
import axios from 'axios';
var ArtistForm = /** @class */ (function (_super) {
    __extends(ArtistForm, _super);
    function ArtistForm(props) {
        var _this = _super.call(this, props) || this;
        //private deleteRecord()
        _this.saveData = function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!_this.state.artistName) {
                _this.setState({ artistNameError: "Required!" });
            }
            else {
                if (_this.props.data.action === "edit") {
                    _this.editRecord();
                }
                else {
                    _this.createRecord();
                }
            }
        };
        _this.handleNameChange = function (event) {
            _this.setState({ artistName: event.target.value });
        };
        _this.state = {
            error: "",
            artistName: (_this.props.data.action === "edit") ? _this.props.data.data.artistName : "",
            artistNameError: "",
        };
        return _this;
    }
    ArtistForm.prototype.createRecord = function () {
        var _this = this;
        var params = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        axios.post('/api/Artists', JSON.stringify({ name: this.state.artistName }), params)
            .then(function (res) {
            _this.props.changeContainer({ display: "MainTable", data: {} });
        })
            .catch(function (error) {
            _this.setState({ error: "Can't create artist" });
        });
    };
    ArtistForm.prototype.editRecord = function () {
        var _this = this;
        this.props.changeContainer({ display: "MainTable", data: {} });
        axios.put('/api/Artists/' + this.props.data.data.artistID, JSON.stringify({ name: this.state.artistName }))
            .then(function (res) {
            //this.props.changeContainer({ display: "MainTable", data: {} });
        })
            .catch(function (error) {
            _this.setState({ error: "Can't edit artist" });
        });
    };
    ArtistForm.prototype.render = function () {
        var artistID = (this.props.data.action === "edit") ?
            (React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "artistID" }, "Artist id*"),
                React.createElement("input", { className: "form-control", id: "artistID", value: this.props.data.data.artistID, readOnly: true })))
            :
                null;
        return (React.createElement("form", null,
            React.createElement("div", { className: "text-danger" }, this.state.error),
            artistID,
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "artistName" }, "Artist name*"),
                React.createElement("input", { className: "form-control", id: "artistName", placeholder: "Enter artist name", onChange: this.handleNameChange, value: this.state.artistName }),
                React.createElement("small", { className: "form-text text-muted text-danger" }, this.state.artistNameError)),
            React.createElement("a", { className: "btn btn-primary", onClick: this.saveData }, "Save")));
    };
    return ArtistForm;
}(React.PureComponent));
export default ArtistForm;
//# sourceMappingURL=ArtistForm.js.map