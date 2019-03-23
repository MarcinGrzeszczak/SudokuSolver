function populateObject(callabck, number){
  let result = []
  for(let i = 0; i < number; ++i)
    result.push(callabck(i))
  return result
}

class SubGrid extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      key: 'SG_'+this.props.gridColumn +","+this.props.gridRow
    }
  }

  createInputSquare(row, column){
    const uniqueId = this.props.gridColumn +","+this.props.gridRow+':'+row+","+column
    return <input id={uniqueId} key={uniqueId} className="Square" type="number" min="1" max="9"></input>
  }

  createSubGrid(rowNumber, columnNumber){
    return populateObject(
      (row)=> <div key={this.state.key+'_row_'+row}> {populateObject(
        (column)=> this.createInputSquare(row, column),
        rowNumber)}</div>,
    columnNumber
    )
  }

  render(){
    return(
      <div className="SubGrid" id={this.state.key} key={this.state.key}>{
        this.createSubGrid(
          this.props.rowNumber,
          this.props.columnNumber)}
      </div>)
  }
}

class Grid extends React.Component{
  createGrid(rowNumber,columnNumber){
    return populateObject(
    (row)=>
      <div key={"GridColumn_"+row} className="GridColumn"> {populateObject(
        (column) => <SubGrid key={"SubGrid_"+row+column} className="SubGrid" gridRow={row} gridColumn={column} rowNumber="3" columnNumber="3"/>,
        columnNumber)}</div>,
      rowNumber
    )
  }

  render() {
    return(<div key="GridDiv">{this.createGrid(this.props.rowNumber, this.props.columnNumber)}</div>)
  }
}

class App extends React.Component{
  render(){
    return(<div>
      <Grid key="Grid" rowNumber="3" columnNumber="3"/>
      <button id="solve">Solve</button>
    </div>)
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
