import React, { Component } from 'react';


class EditableTable extends Component {
  render() {
    return (
        <div className="EditableTable">
          <button>追加</button>
            <table border="1">
                <tr><th>書籍名</th><th>著者</th><th>削除</th></tr>
                <tr><td>たのしいReact入門</td><td>React初心者ユーザグループ</td><td><button>削除</button></td></tr>
                <tr><td>実践React</td><td>○○技術社</td><td><button>削除</button></td></tr>
                <tr><td>React 使える作例100</td><td>○○技術社</td><td><button>削除</button></td></tr>
            </table>
        </div>
    );
  }
}


export default EditableTable;