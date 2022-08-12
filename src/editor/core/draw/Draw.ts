// @ts-ignore
import CursorType from '../event/CursorType'
import { Background } from './frame/Background'
import { Rect } from './frame/Rect'
// import { CanvasEvent } from '../event/CanvasEvent'
// import { GlobalEvent } from '../event/GlobalEvent'
const scaleFactor = 1.1
export class Draw {
  private container: HTMLDivElement
  public ctx: CanvasRenderingContext2D
  public mouse: any
  private nodes: Rect[]
  private background: Background
  private lastX: number
  private lastY: number
  private dragStart: any
  private dragged: boolean


  constructor(
    container: HTMLDivElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.container = container
    this.ctx = ctx

    this.mouse = {
      hover: {
        topLayerZIndex: -Infinity,
        topLayerCursorType: CursorType.defaultCursor,
      }
    }

    this.lastX = container.clientWidth / 2
    this.lastY = container.clientHeight / 2

    this.dragged = false

    this.nodes = this.initCanvasAndData()
    this.background = new Background(this)
    this.trackTransforms(ctx)
    this.initEvent()
    this.render()
  }

  trackTransforms(ctx: CanvasRenderingContext2D){
		const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
		let xform = svg.createSVGMatrix()
		ctx.getTransform = function(){ return xform }

		const savedTransforms: DOMMatrix[] = []
		const save = ctx.save
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0))
			return save.call(ctx)
		}
		const restore = ctx.restore
		ctx.restore = function(){
			xform = savedTransforms.pop() as DOMMatrix
			return restore.call(ctx)
		}

		const scale = ctx.scale
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy)
			return scale.call(ctx,sx,sy)
		}
		const rotate = ctx.rotate
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI)
			return rotate.call(ctx,radians)
		}
		const translate = ctx.translate
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy)
			return translate.call(ctx,dx,dy)
		}
		const transform = ctx.transform
		ctx.transform = function(a,b,c,d,e,f){
			const m2 = svg.createSVGMatrix()
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f
			xform = xform.multiply(m2)
			return transform.call(ctx,a,b,c,d,e,f)
		}
		const setTransform = ctx.setTransform
    // @ts-ignore
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a
			xform.b = b
			xform.c = c
			xform.d = d
			xform.e = e
			xform.f = f
      // @ts-ignore
			return setTransform.call(ctx,a,b,c,d,e,f)
		}
		const pt  = svg.createSVGPoint()
    // @ts-ignore
		ctx.transformedPoint = function(x: number ,y: number){
			pt.x=x; pt.y=y
			return pt.matrixTransform(xform.inverse())
		}
	}


  public zoom (value: number){
    const ctx = this.ctx
    const pt = (ctx as any).transformedPoint(this.lastX, this.lastY)
    ctx.translate(pt.x,pt.y)
    const factor = Math.pow(scaleFactor,value)
    ctx.scale(factor,factor)
    ctx.translate(-pt.x,-pt.y)
    this.render()
  }

  public move = (value: number, isShiftKey: boolean) => {
    if (isShiftKey) {
      this.ctx.translate(value, 0)
    } else {
      this.ctx.translate(0, value)
    }

    this.render()
  }

  public initCanvasAndData () {
    const { clientHeight, clientWidth } = this.container
    this.ctx.canvas.width = clientWidth
    this.ctx.canvas.height = clientHeight

    // const res : Rect[] = []
    // const xN = 50
    // const yN = 50
    // const rowUnit = clientWidth / xN
    // const colUnit = clientHeight / yN
    // for (let i = 0; i < clientWidth; i += rowUnit) {
    //   for (let j = 0; j < clientHeight; j += colUnit) {
    //     res.push(new Rect(this, {left: i, top: j, width: 100, height: 100} ))
    //   }
    // }
    const res : Rect[] = []
    res.push(new Rect(this, {left: 30, top: 30, width: 100, height: 100} ))
    return res
  }

  public getTransFormedScreenPoint(point: {x: number, y: number}) {
    return (this.ctx as any).transformedPoint(point.x, point.y)
  }

  public initEvent () {
    const canvas = this.getCanvas()
    canvas.addEventListener('mousedown', (evt) => {
			// document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none'
      console.log('>>> mousedown', evt.button)
      switch (evt.button) {
        case 1: // 判断是鼠标左键点击
          break
        case 2:
          evt.preventDefault()
          evt.stopPropagation()
          this.lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft)
          this.lastY = evt.offsetY || (evt.pageY - canvas.offsetTop)
          this.dragStart = this.getTransFormedScreenPoint({x: this.lastX, y: this.lastY})
          this.dragged = false
          break
      }
		},false)

    canvas.addEventListener('mousemove', (evt) => {
			this.lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft)
			this.lastY = evt.offsetY || (evt.pageY - canvas.offsetTop)
			this.dragged = true
			if (this.dragStart){
        const pt =this.getTransFormedScreenPoint({x: this.lastX, y: this.lastY})
				this.ctx.translate(pt.x-this.dragStart.x, pt.y - this.dragStart.y)
				this.render()
			}
		},false)

    canvas.addEventListener('mouseup', (evt) => {
			this.dragStart = null
			if (!this.dragged) this.zoom(evt.shiftKey ? -1 : 1 )
		},false)

    const handleScroll = (evt: any) => {
      const isCtrlKey = evt.ctrlKey
      const isShiftKey = evt.shiftKey

			const delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0
      if (delta) {
        if (isCtrlKey)  {
          this.zoom(delta)
        } else {
          this.move(delta, isShiftKey)
        }
      }

			return evt.preventDefault() && false
		}
		canvas.addEventListener('DOMMouseScroll',handleScroll,false)
		canvas.addEventListener('mousewheel',handleScroll,false)

    document.addEventListener('contextmenu', event => event.preventDefault())
  }

  public getOptions () {
    return {
      height: this.getCanvasHeight(),
      width: this.getCanvasWidth()
    }
  }

  public getTransform () {
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
    const p1 = this.getTransFormedScreenPoint({x: 0, y: 0})
    const {width, height}  = this.getOptions()
    const p2 = this.getTransFormedScreenPoint({x: width, y: height})
    ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y)
  }

  public render() {
    this.clearCanvas()

    this.container.style.cursor = this.mouse.topLayerCursorType

    // this.background.render()

    this.nodes.forEach(n => {
      n.render()
    })

  }
}
