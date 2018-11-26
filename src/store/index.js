//store类比为管理员
import { createStore, applyMiddleware, compose } from 'redux'; //applyMiddleware使得我们能够使用中间件
import thunk from 'redux-thunk';
import reducer from './reducer';

//从redux devtools的github页面的advanced store setup部分抄过来
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

//结合多个中间件
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

//第一个参数将记录本传给store，第二个参数表示如果已经安装了redux devtools，那么就是用这个工具
const store = createStore(reducer, enhancer); //实际上window...也是一个中间件

export default store;//因为这里没有class，因此这里注意一定要加上default导出变量