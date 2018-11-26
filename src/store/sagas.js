import {takeEvery, put} from 'redux-saga/effects';
import {GET_INIT_LIST} from "./ActionTypes";
import {getInitListAction} from "./actionCreator";
import axios from "axios";

//建议写成generator函数，也可以是普通函数
function* getInitList() {
  //使用try catch来替换成功或者失败情况下的处理，替换原来的.then, .catch
  try {
    const res = yield axios.get("/list.json");
    const action = getInitListAction(res.data);
    yield put(action);//yield不能省去
  } catch (e) {
    console.log("list.json网络请求失败")
  }
}

//必须包含的一个generator函数
function* todoSaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default todoSaga;
