import React, {Component} from 'react';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);//在构造函数里使用函数绑定this比在调用的时候绑定this提高了性能，推荐这种写法
  }

  handleClick() {
    this.props.deleteItem(this.props.index);//调用父组件传进来的deleteItem方法
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.content}
      </div>
    )
  }
}

export default TodoItem;