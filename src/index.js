import React from 'react';  //不能删除，由它支持JSX语法
import ReactDOM from 'react-dom';
// import TodoList from './TodoList';
// import App from './App';
import NewTodoList from './NewTodoList';
 //react-redux提供的第一个核心Api，它用于连接store，完成连接后，Provider内部的所有组件都有能力去获取store的内容
import { Provider } from 'react-redux';
import store from './store';//引入store

const App = (
  <Provider store={store}>
    <NewTodoList />
  </Provider>
);

//<App />是JSX语法。JSX语法中，如果我们要使用自己创建的组件，直接通过标签形式来使用，首字母必须大写
// ReactDOM.render(<TodoList/>, document.getElementById('root'));  //root节点在index.html中有定义
ReactDOM.render(App, document.getElementById('root'));
