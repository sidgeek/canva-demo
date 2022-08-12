import './assets/css/index.css'
import { Draw } from './core/draw/Draw'
export default class Editor {

  constructor(container: HTMLDivElement, ctx: CanvasRenderingContext2D) {
    // 启动
    const draw = new Draw(container, ctx)
    console.log('>>> 启动实例', draw)
  }
}

// 对外对象
export {
  Editor
}
