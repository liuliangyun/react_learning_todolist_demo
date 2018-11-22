import React, { Component,Fragment } from 'react';
import './App.css';
import { CSSTransition,TransitionGroup } from 'react-transition-group';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem(){
    this.setState((prevState) => ({
      list: [...prevState.list,"item"]
    }))
  }

  render(){
    return (
      <Fragment>
        {/*TransitionGroup是实现通过循环给多个元素加上动画效果，一般里面对每个元素外层还要用CSSTransition标签来设置动画*/}
        <TransitionGroup>
            {
              this.state.list.map((item,index) => {
                return (
                  <CSSTransition
                    //CSSTransition需要感知到当前的入场状态，并自动向div加入样式
                    // in={this.state.show}  //当外层有TransitionGroup时不需要in属性
                    //表示动画要执行多久
                    timeout={1000}
                    //classNames名字要与css文件中定义的样式（fade-enter、fade-enter-active、fade-enter-done、fade-exit、fade-exit-active、fade-exit-done）前缀同名
                    classNames='fade'
                    //unmountOnExit能够在隐藏元素后将对应的DOM节点删除
                    unmountOnExit
                    //CSSTransition提供了很多的钩子（钩子和生命周期函数是一个意思，都是指在特定时间会自动执行的函数）
                    //如：onEnter（当被加上enter或appear class后被执行）、onEntering（当被加上enter-active或appear-active class后被执行）、onEntered（当被加上done classes后被执行）
                    // onExit（当被加上exit class后被执行）、onExiting（当被加上exit-active class后被执行）、onExited（当被加上exit-done class后被执行）
                    onEntered={(el) => {el.style.color="blue"}}
                    //设置第一次appear的时候也会有动画效果，相应地修改css
                    appear={true}
                    key={index}
                  >
                    <div>{item}</div>
                  </CSSTransition>
                )
              })
            }
        </TransitionGroup>
        <button onClick={this.handleAddItem}>AddItem</button>
      </Fragment>
    )
  }
}

export default App;