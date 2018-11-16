import React, {Component} from 'react';

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
    const { content } = this.props; //ES6的解构赋值，一定不能忘了花括号，等价于const content = this.props.content
    return (
      <div onClick={this.handleClick}>
        {content}
      </div>
    )
  }
}

export default TodoItem;