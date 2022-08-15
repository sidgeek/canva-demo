import { IPosition } from '../../interface/Draw'
import { MouseButtonsType } from '../event/mouse/MouseType'
import { Draw } from './Draw'
import { Shape } from './frame/Shape'

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

  private getCanvasPointFromMousePoint(mp: IPosition) {
    return this.draw.getTransFormedScreenPoint(mp)
  }

  private getCanvasPoint(evt: MouseEvent) {
    const canvas = this.draw.getCanvas()
    const mouseX = evt.offsetX || evt.pageX - canvas.offsetLeft
    const mouseY = evt.offsetY || evt.pageY - canvas.offsetTop

    this.draw.mouse.lastX = mouseX
    this.draw.mouse.lastY = mouseY

    return this.getCanvasPointFromMousePoint({
      x: mouseX,
      y: mouseY,
    })
  }

  public handleMouseDown(evt: MouseEvent) {
    evt.preventDefault()
    evt.stopPropagation()

    const { lastX, lastY } = this.draw.mouse
    this.mouse.dragStart = this.getCanvasPointFromMousePoint({
      x: lastX,
      y: lastY,
    })

    switch (evt.buttons) {
      case MouseButtonsType.left: // 判断是鼠标左键点击
        if (this.mouse.hover.target) {
          const t = this.mouse.hover.target
          this.mouse.dragTarget = t
          this.mouse.dragTargetInitPosition = { x: t.left, y: t.top }
        }

        break

      case MouseButtonsType.right: {
        // 右击
        this.mouse.dragged = false
        break
      }
    }
  }

  public handleMousemove(evt: MouseEvent) {
    const pt = this.getCanvasPoint(evt) // 必须调用，更新了lastX

    switch (evt.buttons) {
      case MouseButtonsType.none: {
        this.mouseMove(evt)
        break
      }
      case MouseButtonsType.left: {
        this.mouse.dragged = true
        const { dragStart } = this.mouse
        if (!dragStart) return

        const move = {
          x: pt.x - dragStart.x,
          y: pt.y - dragStart.y,
        }
        if (this.mouse.dragTarget) {
          // 拖动节点
          const t = this.mouse.dragTarget
          const { x, y } = this.mouse.dragTargetInitPosition
          t.updateStart(x + move.x, y + move.y)
          this.draw.render()
        } else {
          // 拖动整个画布
          if (this.mouse.dragStart) {
            this.draw.ctx.translate(move.x, move.y)
            this.draw.render()
          }
        }

        break
      }

      case MouseButtonsType.right: // 右击
        break
    }
  }

  getHitCanvasCtx() {
    const hitCanvas = document.createElement('canvas')
    return hitCanvas.getContext('2d') as CanvasRenderingContext2D
  }

  hasHitNode(point: IPosition, node: Shape) {
    const hitCtx = this.getHitCanvasCtx()

    // keep same size
    const nCanvas = this.draw.getCanvas()
    hitCtx.canvas.width = nCanvas.width
    hitCtx.canvas.height = nCanvas.height

    node.render(hitCtx)
    const w = 10, hw = w / 2
    const h = 10, hH = h / 2
    const left = Math.round(point.x - hw)
    const top = Math.round(point.y - hH)
    const imgData = hitCtx.getImageData(left, top, w, h)

    for (let i = 0; i < imgData.data.length; i += 4) {
      const alpha = imgData.data[i+3]
      if (alpha > 0) return true
    }

    return false
  }

  mouseMove(evt: MouseEvent) {
    const nodes = this.draw.getNodes()
    const cp = this.getCanvasPoint(evt)
    this.mouse.hover.target = null
    nodes.forEach((n) => {
      const isIn = n.isPosInShapeInner(cp)
      if (isIn) {
        this.mouse.hover.target = n
      }

      const hasHit = this.hasHitNode(cp, n)
      if (hasHit) {
        // @ts-ignore
        console.log('>> hit', n.id)
      }
    })
  }

  public handleMouseUp(evt: MouseEvent) {
    this.mouse.dragStart = null
    this.mouse.dragTarget = null
    if (!this.mouse.dragged) this.draw.zoom(evt.shiftKey ? -1 : 1)
  }

  public mouseleave(evt: MouseEvent) {
    // 是否还在canvas内部
  }

  public handleScroll = (evt: MouseEvent) => {
    const isCtrlKey = evt.ctrlKey
    const isShiftKey = evt.shiftKey

    // @ts-ignore
    const eDelta = evt.wheelDelta
    const delta = eDelta ? eDelta / 40 : evt.detail ? -evt.detail : 0
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

  get mouse() {
    return this.draw.mouse
  }
}

export default CanvasEvent
