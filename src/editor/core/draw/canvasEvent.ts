import MouseButtonsType from '../event/mouse/MouseButtonsType'
import { Draw } from './Draw'

class CanvasEvent {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw
  }

  register() {
    const canvas = this.draw.getCanvas()

    if (!canvas) return

    canvas.addEventListener(
      'mousedown',
      this.handleMouseDown.bind(this),
      false
    )
    canvas.addEventListener(
      'mousemove',
      this.handleMousemove.bind(this),
      false
    )
    canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false)

    // @ts-ignore
    canvas.addEventListener(
      'DOMMouseScroll',
      this.handleScroll.bind(this),
      false
    )
    // @ts-ignore
    canvas.addEventListener('mousewheel', this.handleScroll.bind(this), false)

    document.addEventListener('contextmenu', (event) => event.preventDefault())
  }

  public getCanvasPoint(evt: MouseEvent) {
    const canvas = this.draw.getCanvas()
    const mouseX = evt.offsetX || evt.pageX - canvas.offsetLeft
    const mouseY = evt.offsetY || evt.pageY - canvas.offsetTop

    const canvasP = this.draw.getTransFormedScreenPoint({
      x: mouseX,
      y: mouseY,
    })

    return canvasP
  }

  public handleMouseDown(evt: MouseEvent) {
    const canvas = this.draw.getCanvas()

    switch (evt.button) {
      case MouseButtonsType.left: // 判断是鼠标左键点击
        evt.preventDefault()
        evt.stopPropagation()
        this.draw.lastX = evt.offsetX || evt.pageX - canvas.offsetLeft
        this.draw.lastY = evt.offsetY || evt.pageY - canvas.offsetTop
        this.draw.dragStart = this.draw.getTransFormedScreenPoint({
          x: this.draw.lastX,
          y: this.draw.lastY,
        })
        this.draw.dragged = false
        break

      case MouseButtonsType.right: // 右击
        break
    }
  }

  public handleMousemove(evt: MouseEvent) {
    switch (evt.button) {
      case MouseButtonsType.none: {
        this.mouseMove(evt)
        break
      }
      case MouseButtonsType.left:
        {
          // 判断是鼠标左键点击
          const canvas = this.draw.getCanvas()
          this.draw.lastX = evt.offsetX || evt.pageX - canvas.offsetLeft
          this.draw.lastY = evt.offsetY || evt.pageY - canvas.offsetTop
          this.draw.dragged = true
          if (this.draw.dragStart) {
            const pt = this.draw.getTransFormedScreenPoint({
              x: this.draw.lastX,
              y: this.draw.lastY,
            })
            this.draw.ctx.translate(
              pt.x - this.draw.dragStart.x,
              pt.y - this.draw.dragStart.y
            )
            this.draw.render()
          }
        }
        break
      case MouseButtonsType.right: // 右击
        break
    }
  }

  mouseMove(evt: MouseEvent) {
    const nodes = this.draw.getNodes()
    const cp = this.getCanvasPoint(evt)
    // console.log('>>> n', cp)
    nodes.forEach(n => {
      const isIn = n.isPosInShapeInner(cp)
      if (isIn) {
        console.log('>>> n', isIn)
      }
    })
  }

  public handleMouseUp(evt: MouseEvent) {
    this.draw.dragStart = null
    if (!this.draw.dragged) this.draw.zoom(evt.shiftKey ? -1 : 1)
  }

  public mouseleave(evt: MouseEvent) {
    // 是否还在canvas内部
  }

  public handleScroll = (evt: MouseEvent) => {
    const isCtrlKey = evt.ctrlKey
    const isShiftKey = evt.shiftKey

    // @ts-ignore
    console.log('>>> ', evt.wheelDelta)


    // @ts-ignore
    const delta = evt.wheelDelta
      ? evt.wheelDelta / 40
      : evt.detail
      ? -evt.detail
      : 0
    if (delta) {
      if (isCtrlKey) {
        this.draw.zoom(delta)
      } else {
        this.draw.move(delta, isShiftKey)
      }
    }

    // @ts-ignore
    return evt.preventDefault() && false
  };
}

export default CanvasEvent
