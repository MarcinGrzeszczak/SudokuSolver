"use strict";

var NUMBER_OF_ROWS = 9;
var NUMBER_OF_COLUMNS = 9;
var nodes = [];
var rows = {};
var columns = {};

function Node(element, row, column, grid) {
  this.element = element;
  this.rowValues = row;
  this.columnValues = column;
  this.gridValues = grid;
  this.currentValue = 0;
  this.testedValues = [];
}

Node.prototype.show = function () {
  this.element.value = this.currentValue;
};

Node.prototype.removeValue = function (value) {
  if (this.isValueExists(value)) {
    this.columnValues.splice(this.columnValues.indexOf(value), 1);
    this.rowValues.splice(this.rowValues.indexOf(value), 1);
    this.gridValues.splice(this.gridValues.indexOf(value), 1);
  }
};

Node.prototype.addValue = function (newValue) {
  this.testedValues.push(newValue);
  this.columnValues.push(newValue);
  this.rowValues.push(newValue);
  this.gridValues.push(newValue);
  this.currentValue = newValue;
};

Node.prototype.swapValue = function (value) {
  this.removeValue(this.currentValue);
  this.addValue(value);
};

Node.prototype.isValueExists = function (value) {
  return this.rowValues.includes(value) || this.columnValues.includes(value) || this.gridValues.includes(value);
};

Node.prototype.isTestedValue = function (value) {
  return this.testedValues.includes(value);
};

function init() {
  for (var r = 0; r < NUMBER_OF_ROWS; ++r) {
    rows[r] = [];
  }

  for (var c = 0; c < NUMBER_OF_COLUMNS; ++c) {
    columns[c] = [];
  }

  scanNodes();
}

function calculateRowColumn(square, subGrid) {
  square = parseInt(square, 10);
  subGrid = parseInt(subGrid, 10);
  return square + subGrid * 3;
}

function addNewNode(subgridPos, grid, id, nodePos, value) {
  var rowNumber = calculateRowColumn(nodePos[0], subgridPos[0]);
  var columnNumber = calculateRowColumn(nodePos[1], subgridPos[1]);
  var currentRow = rows[rowNumber];
  var currentColumn = columns[columnNumber];

  if (value === '') {
    nodes.push(new Node(document.getElementById(id), currentRow, currentColumn, grid));
  } else {
    value = parseInt(value, 10);
    currentRow.push(value);
    currentColumn.push(value);
    grid.push(value);
  }
}

function scanNodes() {
  var _this = this;

  document.querySelectorAll('.SubGrid').forEach(function (subGrid) {
    var grid = [];
    var subgridPos = subGrid.id.split('_')[1].split(',');
    var addNodeToCurrentGrid = addNewNode.bind(_this, subgridPos, grid);
    subGrid.querySelectorAll('.Square').forEach(function (square) {
      var nodePos = square.id.split(':')[1].split(',');
      addNodeToCurrentGrid(square.id, nodePos, square.value);
    });
  });
}

function fillNode(node) {
  for (var number = 1; number <= 9; ++number) {
    if (!node.isValueExists(number) && !node.isTestedValue(number)) {
      node.swapValue(number);
      return true;
    }
  }

  return false;
}

function solve() {
  var nodeIndex = 0;
  var prev = false;

  while (nodeIndex < nodes.length) {
    var currentNode = nodes[nodeIndex];

    if (fillNode(currentNode)) {
      ++nodeIndex;
      prev = false;
    } else {
      --nodeIndex;

      if (prev) {
        currentNode.removeValue(currentNode.currentValue);
        currentNode.testedValues = [];
      }

      prev = true;
    }

    if (nodeIndex < 0) break;
    currentNode.show();
  }
}

init();

document.getElementById('solve').onclick = function () {
  solve();
};