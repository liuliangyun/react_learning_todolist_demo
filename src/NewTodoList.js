import React from 'react';
import 'antd/dist/antd.css' //引入antd样式文件
import { Input, Button, List } from 'antd';
import { getAddItemAction, getDeleteItemAction, getInputChangeAction } from "./store/actionCreator";
//react-redux提供的第二个核心Api，connect方法让组件和store做连接，规则在mapStateToProps和mapDispatchToProps中
import { connect } from 'react-redux';

//react-redux将NewTodoList改进为一个UI组件，也是一个无状态组件；connect方法返回的结果实际上是一个容器组件。
const NewTodoList = (props) => {
  //解构赋值
  const { inputValue, list, handleInputChange, handleBtnClick, handleItemClick } = props;
  return (
    <div style={{ marginLeft: '10px', marginTop: '10px' }}>
      <div>
        {/*style也可写成style={{width: 300}}*/}
        <Input
          value={inputValue}
          placeholder="todo info"
          style={{ width: '300px', marginRight: '10px' }}
          onChange={handleInputChange}
        />
        <Button type="primary" onClick={handleBtnClick}>
          提交
      </Button>
        <List
          style={{ width: '373px', marginTop: '10px' }}
          bordered
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item onClick={() => handleItemClick(index)}>{item}</List.Item>
          )}
        />
      </div>
    </div>
  )
}

//让store的公用state数据映射为组件的props，通过this.props可以调用store数据
const mapStateToProps = (state) => ({
  inputValue: state.inputValue,
  list: state.list
})

//让store的dispatch方法映射为组件的props，通过this.props可以向store dispatch action以修改store的数据
const mapDispatchToProps = (dispatch) => ({
  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value);
    dispatch(action);
  },
  handleBtnClick() {
    const action = getAddItemAction();
    dispatch(action);
  },
  handleItemClick(index) {
    const action = getDeleteItemAction(index);
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoList);