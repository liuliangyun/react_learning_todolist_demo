export const CHANGE_INPUT_VALUE = 'change_input_value';
export const ADD_TODO_ITEM = 'add_todo_item';
export const DELETE_TODO_ITEM = 'delete_todo_item';
export const INIT_TODO_LIST = 'init_todo_list';


//为什么要将所有的action类型提取到一个文件中定义？
//因为如果这样，常量或者变量在代码里写错是会报异常的；如果不抽出来，单纯写字符串，写错的话不会报异常，出了Bug将非常难调。