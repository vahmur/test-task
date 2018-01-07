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
import ArtistForm from '../components/ArtistForm';
import AlbumForm from '../components/AlbumForm';
import TrackForm from '../components/TrackForm';
var EditRecord = /** @class */ (function (_super) {
    __extends(EditRecord, _super);
    function EditRecord(props) {
        var _this = _super.call(this, props) || this;
        console.log(_this.props);
        return _this;
    }
    EditRecord.prototype.render = function () {
        var _this = this;
        var headingText = (this.props.data.action === "edit") ?
            "Edit " + this.props.data.recordType
            :
                "Create new " + this.props.data.recordType;
        var currentForm;
        switch (this.props.data.recordType) {
            case "artist":
                currentForm = React.createElement(ArtistForm, __assign({}, this.props));
                break;
            case "album":
                currentForm = React.createElement(AlbumForm, __assign({}, this.props));
                break;
            default:
                currentForm = React.createElement(TrackForm, __assign({}, this.props));
                break;
        }
        return (React.createElement("div", null,
            React.createElement("a", { className: "backlink", onClick: function () { return _this.props.changeContainer({ display: "MainTable", data: {} }); } }, '< Back to record list'),
            React.createElement("div", { className: "panel panel-default" },
                React.createElement("div", { className: "panel-heading" }, headingText),
                React.createElement("div", { className: "panel-body" }, currentForm))));
    };
    return EditRecord;
}(React.PureComponent));
export default EditRecord;
//# sourceMappingURL=EditRecord.js.map