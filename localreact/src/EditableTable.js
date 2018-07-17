import React, { Component } from 'react';

class EditableTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: [{title:"書籍名"}, {title:"著者名"}],
      data: 
        [
          [{item:"たのしいReact入門"}, {item:"React初心者ユーザグループ"}],
          [{item:"実践React"}, {item:"○○技術社"}],
          [{item:"React 使える作例100"}, {item:"○○技術社"}],
        ]
    };
    this.addRow = this.addRow.bind(this);
    this.submitTable = this.submitTable.bind(this);
  }
  
  renderHeader() {
    const header = this.state.title.map((t, index) => {
      return <th key={index}>{t.title}</th>;
    });
    return <tr>{header}<th>削除</th></tr>;
  }
  
  renderBody() {
    return this.state.data.map((row, index) => {
      return <DeletableRow row={row} key={index} />;
    });  
  }

  render() {
    return (
        <div className="EditableTable">
          <form action="./" onSubmit={this.submitTable} method="get">
          <table id="editabletable" border="1">
            <thead>
              <tr><td><button onClick={this.addRow}>行を追加する</button></td></tr>
            </thead>
            <tbody>
              {this.renderHeader()}
              {this.renderBody()}
            </tbody>
            <tfoot>
              <tr><td><input type="submit" value="テーブルの内容を登録する"></input></td></tr>
            </tfoot>
          </table>
          </form>
        </div>
    );
  }
  
  addRow(e) {
    const newData = [[{item: "write here."}, {item:"write here."}]];
    newData[0].datastate = "new";
    this.setState(prevState => ({
      data: prevState.data.concat(newData)  
    }));
  }
  
  submitTable(e) {
    e.preventDefault();
    console.log(this.state.data);
    
  }
}

class DeletableRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      row: this.props.row,
      deleted:false
    };
    this.deleteRow = this.deleteRow.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  renderItem(){
    return this.state.row.map((col, index) => {
      const item = {
        item: col.item,
        index: index,
        onChangeContent: this.changeItem
      };
      return <EditableTd content={item} key={index} />;
    });
  }
  
  render(){
    return <tr hidden={this.state.deleted}>
    {this.renderItem()}
    <td><button onClick={this.deleteRow}>削除</button></td></tr>;
  }

  deleteRow(e) {
    this.setState({deleted:true});
    const _row = this.state.row;
    _row.datastate = "deleted";
    this.setState({row: _row});
  }
  
  changeItem(content){
    const _row = this.state.row;
    if(_row.datastate !== "new"){
      _row.datastate = "updated";
    }
    _row[content.index].item = content.item;
    this.setState({row: _row});
  }
}

class EditableTd extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing:false,
      content: this.props.content
    };
    this.changeContent = this.changeContent.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
  }
  
  render() {
    return <td onDoubleClick={this.toggleEditState}><input type="text" onChange={this.changeContent} value={this.state.content.item} readOnly={this.state.editing ? '' : 'readOnly'}></input></td>;
  }
  
  toggleEditState(e) {
    this.setState({editing: !this.state.editing});  
  }

  changeContent(e) {
    const _content = this.state.content;
    _content.item = e.target.value;
    this.setState({content: _content});
    this.props.content.onChangeContent(this.state.content);
  }

}

export default EditableTable;