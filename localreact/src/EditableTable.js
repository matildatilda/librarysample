import React, { Component } from 'react';

class EditableTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: [{title:"書籍名"}, {title:"著者名"}, {title:"削除"}],
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
  
  renderHeader() {
    const header = this.state.title.map((t, index) => {
      return <th key={index}>{t.title}</th>;
    });
    return <tr>{header}</tr>;
  }
  
  renderBody() {
    return this.state.data.map((row, index) => {
      return <DeletableRow row={row} key={index} />;
    });  
  }

  render() {
    return (
        <div className="EditableTable">
          <form action="./" onSubmit={this.submitTable} method="post">
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
    const newData = {item1: "write here.", item2:"write here."};
    this.setState(prevState => ({
      data: prevState.data.concat(newData)  
    }));
  }
  
  submitTable(e) {
    // e.preventDefault();
    console.log(e);
    
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
    return <td onDoubleClick={this.toggleEditState}><input type="text" onChange={this.changeContent} value={this.state.content} readOnly={this.state.editing ? '' : 'readOnly'}></input></td>;
  }
  
  toggleEditState(e) {
    this.setState({editing: !this.state.editing});  
  }

  changeContent(e) {
    this.setState({content: e.target.value});
  }

}

export default EditableTable;