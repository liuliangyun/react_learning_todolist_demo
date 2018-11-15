import React, {Component, Fragment} from 'react';

class TodoList extends Component {

  constructor(props) {
    super(props);  //调用父类的构造函数一次，不能省去
    this.state = {
      inputValue: '',
      list: []
    }
  }

  handleInputChange (e) {
    this.setState({  //改变state时必须使用setState()方法
      inputValue: e.target.value
    });
  }

  // //箭头函数可解决this指向问题
  // handleInputChange = (e) => {
  //   console.log(this);
  // }

  render() {
    return (
      <Fragment>
        {/*在JSX语法中，当要使用JS表达式或者JS变量，在最外层必须要加上大括号*/}
        <div>
          {/*使用bind(this)解决this指向问题*/}
          <input value={this.state.inputValue}
                 onChange={this.handleInputChange.bind(this)} />
          <button>提交</button>
        </div>
        <ul>
          <li>学英语</li>
          <li>Learning React</li>
        </ul>
      </Fragment>
    )
  }
}

export default TodoList;