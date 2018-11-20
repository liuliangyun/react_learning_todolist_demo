import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
// import Test from './Test';
import './style.css';
import axios from 'axios';

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
    // 为什么React设定异步的setState？答：为了提升React底层的性能，如果连续调用3次setState，React可以将其合并成1次setState，
    // 只去做1次虚拟DOM的比对，然后去更新1次DOM，这样可以省去额外的两次DOM比对带来的性能损耗。
    // React的虚拟DOM比对算法，采用了同层比对算法，由顶层开始比对，只要检验发生变化就不会再比对下层节点，下层所有节点也重新根据新的虚拟DOM生成真实DOM节点，替换原始的真实DOM节点。
    // 分析：这样可能对部分未改变的DOM节点造成了重新渲染的损耗，但是由于算法简单，大大节省了虚拟DOM比对消耗的时间。
    // console.log(e.target);//e.target是一个input框DOM节点
    // console.log(this.input);//this.input是通过ref属性得到的input框DOM节点，一般情况下避免使用ref
    // const value = this.input.value;
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

    // console.log(this.ul);//this.ul是通过ref属性得到的DOM节点
    this.setState((prevState) => ({  //推荐使用prevState，表示之前的state对象
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }));
    // this.setState((prevState) => ({  //推荐使用prevState，表示之前的state对象
    //   list: [...prevState.list, prevState.inputValue],
    //   inputValue: ''
    // }), () => {
    //   console.log(this.ul.querySelectorAll('div').length);//setState的第二个参数是一个回调函数，这个函数会在setState异步执行完毕以后才会被执行，可以确保当函数执行时页面已经更新完了。
    // });
    //打印ul节点下div节点的出现次数，此时由于setState是异步函数，并不会马上执行，所以实际上打印的是页面未重新渲染前的div节点个数
    // console.log(this.ul.querySelectorAll('div').length);
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

  // //在组件即将被挂载到页面的时刻自动执行
  // componentWillMount(){
  //   console.log("componentWillMount");
  // }

  render() {
    // console.log("parent render");
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
            /*使用ref来操作DOM节点*/
            // ref={(input) => (this.input = input)}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        {/*<ul ref={(ul) => (this.ul = ul)}>*/}
        <ul>
          {/*加上括号表示方法立刻执行*/}
          {this.getTodoItem()}
          {/*<Test content={this.state.inputValue} />*/}
        </ul>
      </Fragment>
    )
  }

  //ajax请求应该放在只会被执行一次的生命周期函数中，一般推荐放在componentDidMount函数中
  //在组件被挂载到页面之后自动执行
  componentDidMount(){
    // console.log("componentDidMount");
    axios.get('/api/todolist')
      .then(() => {alert("success")})
      .catch(() => {alert("error")})
  }

  // //在组件被更新之前自动执行
  // shouldComponentUpdate(){
  //   console.log("shouldComponentUpdate");
  //   return true;//一般返回true，返回false表示不要被更新
  // }
  //
  // //在组件被更新之前自动执行,但是在shouldComponentUpdate之后被执行。如果shouldComponentUpdate返回true，它才会被执行。
  // componentWillUpdate(){
  //   console.log("componentWillUpdate");
  // }
  //
  // //在组件更新完成之后自动执行
  // componentDidUpdate(){
  //   console.log("componentDidUpdate");
  // }

  // 由于TodoList是顶层组件，没有接收任何props，因此该函数放这里不会被自动执行
  // componentWillReceiveProps(){
  //   console.log("componentWillReceiveProps");
  // }

  getTodoItem() {
    // 在react里，当你做循环渲染时，需要给渲染出的每一项增加一个key值，这是每一项的唯一标志符，不然控制台会报一个警告。
    // 这里我们选用了index作为每一项的key值，但实际上这是不推荐的行为
    return this.state.list.map((item, index) => {
      //bind()函数通过在this后添加其它变量，向调用的方法里传递参数
      return (
        //如果不包裹外层的div，那么将return两块元素，即一个TodoItem和一个注释块
        //key值应该放在循环的最外层元素上
        //为什么设置key值？答：因为若没有key值，当比较两个虚拟DOM树时，很难确立节点与节点间的关系，需要使用嵌套循环来比对。当有了key值后，只需要在同层比较时，根据节点的key值直接进行一层内节点的比对就可以了
        //但是上述设置key值提升虚拟DOM比对的性能有一个前提，就是之前虚拟DOM树上的节点key值到了新的虚拟DOM树上的节点key值保持不变。
        //为什么不推荐将index设置为key值？答：因为节点key值在原始虚拟DOM树和新的虚拟DOM树上需要保持一致，若使用index作为key值，将不能保持稳定的节点key值，如添加三个todoItem(a、b、c)，a的key为0，
        //b的key为1，c的key为2，当我们删除了a以后，b的key变为0，c的key变为1，同一个DOM节点的key值发生了变化。因此我们不推荐使用index作为节点的key值。
        <TodoItem
          key={item}
          content={item}
          index={index}
          deleteItem={this.handleItemDelete} //这里必须要使用this绑定，不然子组件调用deleteItem方法时会找不到handleItemDelete方法
        />
      )
    })
  }
}

export default TodoList;