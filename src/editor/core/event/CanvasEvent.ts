import { Draw } from '../draw/Draw'


export class CanvasEvent {

  private draw: Draw


  constructor(draw: Draw) {
    this.draw = draw
  }

  public register() {
    // 延迟加载
    // this.pageContainer.addEventListener('mousedown', this.mousedown.bind(this))
    // this.pageContainer.addEventListener('mouseleave', this.mouseleave.bind(this))
    // this.pageContainer.addEventListener('mousemove', this.mousemove.bind(this))
    // this.pageContainer.addEventListener('dblclick', this.dblclick.bind(this))
  }

  public clearPainterStyle() {

  }

  public mousemove(evt: MouseEvent) {

  }

  public mousedown(evt: MouseEvent) {

  }

  public mouseleave(evt: MouseEvent) {
    // 是否还在canvas内部
  }
}
