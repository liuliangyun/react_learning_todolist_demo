import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
import './style.css';

class TodoList extends Component {

  constructor(props) {
    //当组件的state或者props发生改变的时候，render函数就会重新执行
    super(props);  //调用父类的构造函数一次，不能省去
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  handleInputChange(e) {
    // this.setState({  //改变state时必须使用setState()方法
    //   inputValue: e.target.value
    // });

    //新版setState的用法是将传递对象参数改为传递方法参数，该方法返回一个对象
    //因为此时的setState是异步的，我们必须将e.target.value保存到setState()方法外部，不然会直接使用e.target.value会报错
    const value = e.target.value;
    this.setState(() => ({  //ES6语法中使用() => ({}), 此时大括号外层的小括号代表返回一个对象，省略return语句
      inputValue: value
    }))
  }

  // //箭头函数可解决this指向问题
  // handleInputChange = (e) => {
  //   console.log(this);
  // }

  handleBtnClick() {
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],  //...this.state.list是将state的list数组中的所有值拷贝到一个新的数组
    //   inputValue: ''
    // })


    this.setState((prevState) => ({  //推荐使用prevState，表示之前的state对象
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
  }

  handleItemDelete(index) {
    // //immutable，即state不允许我们做任何改变，因此将state中的list拷贝一份，改变拷贝的数据，再重新setState
    // const list = [...this.state.list];
    // list.splice(index, 1);
    // this.setState({
    //   list: list
    // })

    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {
        list   //ES6支持的简写，等价于list: list
      };
    })
  }

  render() {
    // console.log("render");
    return (
      <Fragment>
        {/*在JSX语法中，当要使用JS表达式或者JS变量，在最外层必须要加上大括号*/}
        <div>
          {/*React推荐使用htmlFor代替label的for属性，以免和for循环的定义混淆导致控制台报警告*/}
          {/*htmlFor属性值等于获取焦点元素的id值相同*/}
          <label htmlFor='insertArea'>输入内容</label>
          {/*使用bind(this)解决this指向问题*/}
          {/*React推荐使用className代替css的class，以免和组件类的定义混淆后导致控制台报警告*/}
          <input
            id='insertArea'
            className='input'
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>
          {/*加上括号表示方法立刻执行*/}
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }

  getTodoItem() {
    // 在react里，当你做循环渲染时，需要给渲染出的每一项增加一个key值，这是每一项的唯一标志符，不然控制台会报一个警告。
    // 这里我们选用了index作为每一项的key值，但实际上这是不推荐的行为
    return this.state.list.map((item, index) => {
      //bind()函数通过在this后添加其它变量，向调用的方法里传递参数
      return (
        //如果不包裹外层的div，那么将return两块元素，即一个TodoItem和一个注释块
        //key值应该放在循环的最外层元素上
        <div key={index}>
          <TodoItem
            content={item}
            index={index}
            deleteItem={this.handleItemDelete} //这里必须要使用this绑定，不然子组件调用deleteItem方法时会找不到handleItemDelete方法
          />
          {/*<li
                  key={index}
                  onClick={this.handleItemDelete.bind(this, index)}
                  dangerouslySetInnerHTML={{__html: item}}
                >
                </li>*/}
        </div>
      )
    })
  }
}

export default TodoList;