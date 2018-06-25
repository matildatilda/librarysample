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
    }

  render() {
    return (
        <div className="EditableTable">
          <button>追加</button>
            <table border="1">
                <tr><th>書籍名</th><th>著者</th><th>削除</th></tr>
                <TableContents contents={this.state.data} />
            </table>
        </div>
    );
  }
}

class TableContents extends Component {
  render(){
    return this.props.contents.map(row => {
      return <tr><td>{row.item1}</td><td>{row.item2}</td><td><button>削除</button></td></tr>;
    });
  }
}

export default EditableTable;