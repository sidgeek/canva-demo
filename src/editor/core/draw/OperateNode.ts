import { Draw } from './Draw'

class OperateNode {
  constructor(public draw: Draw) {
  }

  eventmove() { // point: 鼠标对应的画点 mouse: 鼠标点
    // for (let node of Object.values(this.nodes)) {
    //   if (node.eventmove()) return node
    // }
  }
}

export default OperateNode
