//store类比为管理员
import { createStore } from 'redux';
import reducer from './reducer';

//第一个参数将记录本传给store，第二个参数表示如果已经安装了redux devtools，那么就是用这个工具
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;//因为这里没有class，因此这里注意一定要加上default导出变量