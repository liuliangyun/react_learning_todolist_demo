import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from "./ActionTypes";

//reducer类比为记录本
const defaultState={
  inputValue: '',
  list: []
}

//reducer可以接收state，但是不能修改state，所以需要修改时，一般使用深拷贝，然后修改拷贝出来的那份数据，最后返回
export default (state=defaultState, action) => {
  if(action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));//深拷贝
    newState.inputValue = action.value;
    return newState;
  }
  if(action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));//深拷贝
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }
  if(action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));//深拷贝
    newState.list.splice(action.index,1);
    return newState;
  }
  return state;
}