import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);//在构造函数里使用函数绑定this比在调用的时候绑定this提高了性能，推荐这种写法
  }

  handleClick() {
    //ES6的解构赋值，一定不能忘了花括号，等价于const deleteItem = this.props.deleteItem && const index = this.props.index
    const { deleteItem,index } = this.props;
    deleteItem(index);//调用父组件传进来的deleteItem方法
  }

  render() {
    console.log("child render");
    // const { content,test } = this.props; //ES6的解构赋值，一定不能忘了花括号，等价于const content = this.props.content
    const { content } = this.props;
    return (
      <div onClick={this.handleClick}>
        {content}
        {/*{test} - {content}*/}
      </div>
    )

    // JSX -> createElement() -> 虚拟DOM(JS 对象) -> 真实DOM
    // return <div><span>item</span></div>;
    // return React.createElement('div',{},React.createElement('span',{},'item')); //与使用JSX模板返回结果是一样的，省去了JSX -> createElement()的步骤
  }

  //目前的情况是当父组件的input框中的内容发生改变时，由于父组件数据改变导致父组件重新渲染，导致已经存在的TodoItem子组件也会跟着重新渲染
  //此时，可运用生命周期函数来做性能优化
  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.content !== this.props.content) {
      return true;
    } else {
      return false;
    }
  }

  // //被执行的条件：一个组件要从父组件接收参数，且如果这个组件第一次存在与父组件中，不会执行该函数，如果这个组件之前已经存在于父组件中，才会执行。
  // componentWillReceiveProps(){
  //   console.log("child componentWillReceiveProps");
  // }
  //
  // //当这个组件即将被从页面中删除的时候会被执行
  // componentWillUnmount(){
  //   console.log("child componentWillUnmount");
  // }
}

//建议在开发中写上propTypes进行属性接收的校验
TodoItem.propTypes = {   //此时的propTypes首字母p小写,T大写
  // test: PropTypes.string.isRequired,  //isRequired要求父组件必须传递该属性，若不加isRequired，则会滤过这一行属性校验，也不会报任何错误信息
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),  //此时的PropTypes首字母P大写,T大写，与import接的名称相同
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

// //如果父组件没有向子组件传递对应属性，可以在子组件中自定义默认值
// TodoItem.defaultProps = {
//   test: 'hello world'
// }

export default TodoItem;