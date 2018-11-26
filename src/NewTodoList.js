import React, { Component } from 'react';
import 'antd/dist/antd.css'//引入antd样式文件
import { Input, Button, List } from 'antd';
import store from './store' //实际上引入的是index.js文件，可以省略，因为会自动找store文件夹下的index.js文件
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from "./store/actionCreator";


class NewTodoList extends Component{

  constructor(props){
    super(props);
    this.state = store.getState();//使用store提供的getState方法获取数据
    this.handleInputChange = this.handleInputChange.bind(this); //向store发送action
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    store.subscribe(this.handleStoreChange);//监听store数据的变化，实时更新组件的数据显示
  }

  render(){
    return (
      <div style={{marginLeft: '10px', marginTop: '10px'}}>
        <div>
          {/*style也可写成style={{width: 300}}*/}
          <Input
            value={this.state.inputValue}
            placeholder="todo info"
            style={{width: '300px', marginRight: '10px'}}
            onChange={this.handleInputChange}
          />
          <Button type="primary" onClick={this.handleBtnClick}>
            提交
          </Button>
          <List
            style={{width: '373px', marginTop: '10px'}}
            bordered
            dataSource={this.state.list}
            renderItem={(item) => (
              <List.Item onClick={(index) => this.handleItemDelete(index)}>{item}</List.Item>
            )}
          />
        </div>
      </div>
    )
  }

  handleInputChange(e){
    //首先定义action
    const action = getInputChangeAction(e.target.value);
    //然后调用store的dispatch方法发送action
    store.dispatch(action);
  }

  handleStoreChange(){
    // console.log('store changed');
    this.setState(store.getState());
  }

  handleBtnClick(){
    const action = getAddItemAction();
    store.dispatch(action);
  }

  handleItemDelete(index){
    const action = getDeleteItemAction(index);
    store.dispatch(action);
  }
}

export default NewTodoList;