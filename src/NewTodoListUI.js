import React, {Component} from 'react';
import { Input, Button, List } from 'antd';

class NewTodoListUI extends Component {
  render() {
    return (
      <div style={{marginLeft: '10px', marginTop: '10px'}}>
        <div>
          {/*style也可写成style={{width: 300}}*/}
          <Input
            value={this.props.inputValue}  //通过props接收并展示容器组件传递来的数据
            placeholder="todo info"
            style={{width: '300px', marginRight: '10px'}}
            onChange={this.props.handleInputChange}
          />
          <Button type="primary" onClick={this.props.handleBtnClick}>
            提交
          </Button>
          <List
            style={{width: '373px', marginTop: '10px'}}
            bordered
            dataSource={this.props.list}
            renderItem={(item, index) => (
              <List.Item onClick={()=>this.props.handleItemDelete(index)}>{item}</List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

export default NewTodoListUI;