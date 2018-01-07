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
import MainTable from './containers/MainTable';
import EditRecord from './containers/EditRecord';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        /* Change main container function */
        _this.changeContainer = function (data) {
            _this.setState({ display: data.display, data: data.data });
        };
        _this.state = {
            display: 'MainTable',
            data: null,
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        var container;
        switch (this.state.display) {
            case 'MainTable':
                container = React.createElement(MainTable, { changeContainer: function (data) { return _this.changeContainer(data); } });
                break;
            default:
                container = React.createElement(EditRecord, { changeContainer: function (data) { return _this.changeContainer(data); }, data: this.state.data });
        }
        return (React.createElement("div", { className: "App" }, container));
    };
    return App;
}(React.PureComponent));
export default App;
//# sourceMappingURL=App.js.map