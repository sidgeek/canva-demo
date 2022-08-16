// @ts-ignore
import CanvasEvent from './canvasEvent'
import CursorType from '../event/CursorType'
import { Background } from './frame/Background'
import { FakeNodeConfigs } from './initData'
import { IMouseButtonsType } from '../event/mouse/MouseType'
import VNode from './node'
// import { GlobalEvent } from '../event/GlobalEvent'
const scaleFactor = 1.1
export class Draw {
  private container: HTMLDivElement;
  public ctx: CanvasRenderingContext2D;
  public mouse: IMouseButtonsType;
  private nodes: VNode[];
  // private background: Background;

  private canvasEvent: any;
  private dpr: number;

  constructor(container: HTMLDivElement, ctx: CanvasRenderingContext2D) {
    this.container = container
    this.ctx = ctx
    this.dpr = this.getPixRatio()

    this.mouse = {
      hover: {
        target: null,
        topLayerZIndex: -Infinity,
        topLayerCursorType: CursorType.defaultCursor,
      },
      lastX: container.clientWidth / 2,
      lastY: container.clientHeight / 2,
      dragStart: null,
      dragged: false,
      dragTarget: null,
      dragTargetInitPosition: { x: 0, y: 0 },
    }

    this.nodes = this.initNodes()
    this.initCanvas()
    this.canvasEvent = new CanvasEvent(this)
    this.canvasEvent.register()
    this.render()
  }

  trackTransforms(ctx: CanvasRenderingContext2D) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let xform = svg.createSVGMatrix()
    ctx.getTransform = function () {
      return xform
    }

    const savedTransforms: DOMMatrix[] = []
    const save = ctx.save
    ctx.save = function () {
      savedTransforms.push(xform.translate(0, 0))
      return save.call(ctx)
    }
    const restore = ctx.restore
    ctx.restore = function () {
      xform = savedTransforms.pop() as DOMMatrix
      return restore.call(ctx)
    }

    const scale = ctx.scale
    ctx.scale = function (sx, sy) {
      xform = xform.scaleNonUniform(sx, sy)
      return scale.call(ctx, sx, sy)
    }
    const rotate = ctx.rotate
    ctx.rotate = function (radians) {
      xform = xform.rotate((radians * 180) / Math.PI)
      return rotate.call(ctx, radians)
    }
    const translate = ctx.translate
    ctx.translate = function (dx, dy) {
      xform = xform.translate(dx, dy)
      return translate.call(ctx, dx, dy)
    }
    const transform = ctx.transform
    ctx.transform = function (a, b, c, d, e, f) {
      const m2 = svg.createSVGMatrix()
      m2.a = a
      m2.b = b
      m2.c = c
      m2.d = d
      m2.e = e
      m2.f = f
      xform = xform.multiply(m2)
      return transform.call(ctx, a, b, c, d, e, f)
    }
    const setTransform = ctx.setTransform
    // @ts-ignore
    ctx.setTransform = function (a, b, c, d, e, f) {
      xform.a = a
      xform.b = b
      xform.c = c
      xform.d = d
      xform.e = e
      xform.f = f
      // @ts-ignore
      return setTransform.call(ctx, a, b, c, d, e, f)
    }
    const pt = svg.createSVGPoint()
    // @ts-ignore
    ctx.transformedPoint = function (x: number, y: number) {
      pt.x = x
      pt.y = y
      return pt.matrixTransform(xform.inverse())
    }
  }

  getPixRatio () {
    return window.devicePixelRatio || 1
  }

  public zoom(value: number) {
    const ctx = this.ctx
    const pt = (ctx as any).transformedPoint(
      this.mouse.lastX,
      this.mouse.lastY
    )
    ctx.translate(pt.x, pt.y)
    const factor = Math.pow(scaleFactor, value)
    ctx.scale(factor, factor)
    ctx.translate(-pt.x, -pt.y)
    this.render()
  }

  public move = (value: number, isShiftKey: boolean) => {
    if (isShiftKey) {
      this.ctx.translate(value, 0)
    } else {
      this.ctx.translate(0, value)
    }

    this.render()
  };

  private canvasResize(width: number, height: number) {
    width = window.innerWidth
    height = window.innerHeight

    const canvas = this.ctx.canvas
    const dpr = this.dpr

    canvas.width = width * dpr
    canvas.height = height * dpr

    this.ctx.scale(dpr, dpr)

    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
  }

  public initCanvas() {
    const { clientHeight: height, clientWidth: width } = this.container

    // 画布初始化
    this.canvasResize(width, height)
    this.trackTransforms(this.ctx)
  }

  public initNodes() {
    return FakeNodeConfigs.map((config) => VNode.createNode(this, config))
  }

  public getTransFormedScreenPoint(point: { x: number; y: number }) {
    return (this.ctx as any).transformedPoint(point.x, point.y)
  }

  public getOptions() {
    return {
      height: this.getCanvasHeight(),
      width: this.getCanvasWidth(),
    }
  }

  public getTransform() {
    return this.ctx.getTransform()
  }

  public getCanvas(): HTMLCanvasElement {
    return this.ctx.canvas
  }

  public getCanvasWidth(): number {
    return this.ctx.canvas.width
  }

  public getCanvasHeight(): number {
    return this.ctx.canvas.height
  }

  public getContainer(): HTMLDivElement {
    return this.container
  }

  // Clear the entire canvas
  public clearCanvas() {
    const ctx = this.ctx as any
    const p1 = this.getTransFormedScreenPoint({ x: 0, y: 0 })
    const { width, height } = this.getOptions()
    const p2 = this.getTransFormedScreenPoint({ x: width / this.dpr, y: height / this.dpr })
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y)
  }

  public getNodes() {
    return this.nodes
  }

  public render() {
    this.clearCanvas()

    this.container.style.cursor = this.mouse.hover.topLayerCursorType

    // this.background.render()

    this.nodes.forEach((n) => {
      n.render()
    })
  }
}
