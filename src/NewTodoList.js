import React, { Component } from 'react';
import 'antd/dist/antd.css'//引入antd样式文件
import { Input, Button, List } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class NewTodoList extends Component{

  render(){
    return (
      <div style={{marginLeft: '10px', marginTop: '10px'}}>
        <div>
          {/*style也可写成style={{width: 300}}*/}
          <Input placeholder="todo info" style={{width: '300px', marginRight: '10px'}} />
          <Button type="primary">提交</Button>
          <List
            style={{width: '373px', marginTop: '10px'}}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      </div>
    )
  }
}

export default NewTodoList;