import React, { Component } from 'react';

class EditableTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: 
        [
          {item1:"たのしいReact入門", item2:"React初心者ユーザグループ"},
          {item1:"実践React", item2:"○○技術社"},
          {item1:"React 使える作例100", item2:"○○技術社"},
        ]
    };
    this.addRow = this.addRow.bind(this);
    this.submitTable = this.submitTable.bind(this);
  }

  render() {
    return (
        <div className="EditableTable">
          <table border="1">
            <thead>
              <tr><td><button onClick={this.addRow}>行を追加する</button></td></tr>
            </thead>
            <tbody>
              <tr><th>書籍名</th><th>著者</th><th>削除</th></tr>
              <TableContents contents={this.state.data} />
            </tbody>
            <tfoot>
              <tr><td><button onClick={this.submitTable}>テーブルの内容を登録する</button></td></tr>
            </tfoot>
          </table>
        </div>
    );
  }
  
  addRow(e) {
    const newData = {item1: "write here.", item2:"write here."};
    this.setState(prevState => ({
      data: prevState.data.concat(newData)  
    }));
  }
  
  submitTable(e) {
  
  }

}

class TableContents extends Component {
  render(){
    return this.props.contents.map((row, index) => {
      return <DeletableRow row={row} key={index} />;
    });
  }
}

class DeletableRow extends Component {
  constructor(props){
    super(props);
    this.state = {deleted:false};
    this.deleteContent = this.deleteContent.bind(this);
  }
  
  render(){
    return <tr hidden={this.state.deleted}><EditableTd content={this.props.row.item1} /><EditableTd content={this.props.row.item2} /><td><button onClick={this.deleteContent}>削除</button></td></tr>;
  }

  deleteContent(e) {
    this.setState({deleted:true});
  }
}

class EditableTd extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing:false,
      content: this.props.content,
    };
    this.changeContent = this.changeContent.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
  }
  
  render() {
    return this.state.editing ? <td onDoubleClick={this.toggleEditState}><input type="text" onChange={this.changeContent} value={this.state.content}></input></td> : <td onDoubleClick={this.toggleEditState}><label onDoubleClick={this.toggleEditState}>{this.state.content}</label></td>;
  }
  
  toggleEditState(e) {
    this.setState({editing: !this.state.editing});  
  }
  
  changeContent(e) {
    this.setState({content: e.target.value});
  }
}

export default EditableTable;