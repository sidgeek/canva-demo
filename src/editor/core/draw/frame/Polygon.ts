import { IPosition } from '../../../interface/Draw'
import { IBoundingBox } from '../../event/IBoundingBox'
import { IShapeOptions, Shape } from './Shape'

export class Polygon extends Shape {
  private points: IPosition[]
  constructor(ctx: CanvasRenderingContext2D, size: IBoundingBox, options: IShapeOptions, points: IPosition[]) {
    const {left, top, width, height } = size
    super(ctx, left, top, width, height, options)
    this.points = points
  }

  getPatchedPoints() {
    return this.points.map(e => ({
      x: e.x + this.left,
      y: e.y + this.top
    }))
  }

  public render(eCtx?: CanvasRenderingContext2D) {
    const ctx = eCtx || this.ctx

    super.render()
    // const {left, top, width, height} = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.lineWidth = 1
    const patchedPoints = this.getPatchedPoints()

    ctx.moveTo(this.left, this.top)
    patchedPoints.forEach(p => {
      ctx.lineTo(p.x, p.y)
    })
    ctx.lineTo(this.left, this.top)

    ctx.stroke()
    ctx.restore()
  }
}
