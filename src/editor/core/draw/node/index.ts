import { IPosition } from '../../../interface/Draw'
import { Draw } from '../Draw'
import { Polygon } from '../frame'
import { Rect } from '../frame/Rect'
import { IShapeOptions, Shape } from '../frame/Shape'

class VNode {
  private background: Rect
  private shape: Shape
  private isHover: boolean
  private id: number

  constructor(public draw: Draw, options: IShapeOptions) {
    const backgroundFillColor = 'blue'
    this.background = new Rect(draw.ctx, {...options, fillColor: backgroundFillColor})
    this.shape = this.createShape(draw.ctx, options)
    this.isHover = false
    this.id = options.id || Math.random()
  }


  createShape(ctx: CanvasRenderingContext2D, options: IShapeOptions) {
    let obj
    switch (options.type) {
      case 'rect':
        obj = new Rect(ctx, options)
        break
      case 'polygon':
        obj = new Polygon(ctx, options)
        break
      default:
        obj = new Rect(ctx, options)
        break
    }

    return obj
  }

  static createNode(draw: Draw, options: IShapeOptions) {
    return new VNode(draw, options)
  }

  public isInNodeInner(cp: IPosition, gap = 10) {
    return this.shape.isPosInShapeInner(cp, gap)
  }

  public getLeftTopPos() {
    const {left, top} = this.shape
    return {x: left, y: top}
  }

  public getId() {
    return `${this.id}`
  }

  public updateHoverStatus(isHover: boolean) {
    const isChanged = isHover === this.isHover
    this.isHover = isHover
    return isChanged
  }

  render() {
    if (this.isHover) {
      debugger
      this.background.render()
    }
    this.shape.render()
  }

  renderShape(eCtx?: CanvasRenderingContext2D) {
    this.shape.render(eCtx)
  }
}

export default VNode
