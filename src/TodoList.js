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

  handleBtnClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],  //...this.state.list是将state的list数组中的所有值拷贝到一个新的数组
      inputValue: ''
    })
  }

  handleItemDelete(index) {
    //immutable，即state不允许我们做任何改变，因此将state中的list拷贝一份，改变拷贝的数据，再重新setState
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list: list
    })
  }

  render() {
    return (
      <Fragment>
        {/*在JSX语法中，当要使用JS表达式或者JS变量，在最外层必须要加上大括号*/}
        <div>
          {/*使用bind(this)解决this指向问题*/}
          <input value={this.state.inputValue}
                 onChange={this.handleInputChange.bind(this)} />
          <button onClick={this.handleBtnClick.bind(this)}>提交</button>
        </div>
        <ul>
          {/*在react里，当你做循环渲染时，需要给渲染出的每一项增加一个key值，这是每一项的唯一标志符，不然控制台会报一个警告。
              这里我们选用了index作为每一项的key值，但实际上这是不推荐的行为*/}
          {
            this.state.list.map((item, index) => {
              //bind()函数通过在this后添加其它变量，向调用的方法里传递参数
              return <li key={index} onClick={this.handleItemDelete.bind(this, index)}>{item}</li>
            })
          }
        </ul>
      </Fragment>
    )
  }
}

export default TodoList;