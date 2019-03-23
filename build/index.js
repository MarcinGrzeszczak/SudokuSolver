"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function populateObject(callabck, number) {
  var result = [];

  for (var i = 0; i < number; ++i) {
    result.push(callabck(i));
  }

  return result;
}

var SubGrid =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SubGrid, _React$Component);

  function SubGrid(props) {
    var _this;

    _classCallCheck(this, SubGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SubGrid).call(this, props));
    _this.state = {
      key: 'SG_' + _this.props.gridColumn + "," + _this.props.gridRow
    };
    return _this;
  }

  _createClass(SubGrid, [{
    key: "createInputSquare",
    value: function createInputSquare(row, column) {
      var uniqueId = this.props.gridColumn + "," + this.props.gridRow + ':' + row + "," + column;
      return React.createElement("input", {
        id: uniqueId,
        key: uniqueId,
        className: "Square",
        type: "number",
        min: "1",
        max: "9"
      });
    }
  }, {
    key: "createSubGrid",
    value: function createSubGrid(rowNumber, columnNumber) {
      var _this2 = this;

      return populateObject(function (row) {
        return React.createElement("div", {
          key: _this2.state.key + '_row_' + row
        }, " ", populateObject(function (column) {
          return _this2.createInputSquare(row, column);
        }, rowNumber));
      }, columnNumber);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "SubGrid",
        id: this.state.key,
        key: this.state.key
      }, this.createSubGrid(this.props.rowNumber, this.props.columnNumber));
    }
  }]);

  return SubGrid;
}(React.Component);

var Grid =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Grid, _React$Component2);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: "createGrid",
    value: function createGrid(rowNumber, columnNumber) {
      return populateObject(function (row) {
        return React.createElement("div", {
          key: "GridColumn_" + row,
          className: "GridColumn"
        }, " ", populateObject(function (column) {
          return React.createElement(SubGrid, {
            key: "SubGrid_" + row + column,
            className: "SubGrid",
            gridRow: row,
            gridColumn: column,
            rowNumber: "3",
            columnNumber: "3"
          });
        }, columnNumber));
      }, rowNumber);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        key: "GridDiv"
      }, this.createGrid(this.props.rowNumber, this.props.columnNumber));
    }
  }]);

  return Grid;
}(React.Component);

var App =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(Grid, {
        key: "Grid",
        rowNumber: "3",
        columnNumber: "3"
      }), React.createElement("button", {
        id: "solve"
      }, "Solve"));
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));