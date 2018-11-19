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
    const { content,test } = this.props; //ES6的解构赋值，一定不能忘了花括号，等价于const content = this.props.content
    return (
      <div onClick={this.handleClick}>
        {test} - {content}
      </div>
    )
  }
}

//建议在开发中写上propTypes进行属性接收的校验
TodoItem.propTypes = {   //此时的propTypes首字母p小写,T大写
  test: PropTypes.string.isRequired,  //isRequired要求父组件必须传递该属性，若不加isRequired，则会滤过这一行属性校验，也不会报任何错误信息
  content: PropTypes.string,  //此时的PropTypes首字母P大写,T大写，与import接的名称相同
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

//如果父组件没有向子组件传递对应属性，可以在子组件中自定义默认值
TodoItem.defaultProps = {
  test: 'hello world'
}

export default TodoItem;