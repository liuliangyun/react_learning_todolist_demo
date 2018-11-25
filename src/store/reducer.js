//reducer类比为记录本
const defaultState={
  inputValue: '',
  list: []
}

//reducer可以接收state，但是不能修改state，所以需要修改时，一般使用深拷贝，然后修改拷贝出来的那份数据，最后返回
export default (state=defaultState, action) => {
  if(action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state));//深拷贝
    newState.inputValue = action.value;
    return newState;
  }
  if(action.type === "add_todo_item") {
    const newState = JSON.parse(JSON.stringify(state));//深拷贝
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }
  if(action.type === 'delete_todo_item') {
    const newState = JSON.parse(JSON.stringify(state));//深拷贝
    newState.list.splice(action.index,1);
    return newState;
  }
  return state;
}