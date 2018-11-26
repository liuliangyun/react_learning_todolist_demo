import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_TODO_LIST } from "./ActionTypes";
import axios from "axios";

//定义一个函数，返回一个action对象
export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM,
});

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
});

export const getInitListAction = (data) => ({
  type: INIT_TODO_LIST,
  data
});

export const getTodoList = () => {
  return (dispatch) => {
    axios.get("/list.json").then((res) => {
      // console.log(res.data);
      const action = getInitListAction(res.data);
      dispatch(action);
    })
  }
};

