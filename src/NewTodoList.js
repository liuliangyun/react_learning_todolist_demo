import React, { Component } from 'react';
import 'antd/dist/antd.css'//引入antd样式文件
import { Input, Button, List } from 'antd';
import store from './store' //实际上引入的是index.js文件，可以省略，因为会自动找store文件夹下的index.js文件


class NewTodoList extends Component{

  constructor(props){
    super(props);
    this.state = store.getState();//使用store提供的getState方法获取数据
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
          />
          <Button type="primary">提交</Button>
          <List
            style={{width: '373px', marginTop: '10px'}}
            bordered
            dataSource={this.state.list}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      </div>
    )
  }
}

export default NewTodoList;