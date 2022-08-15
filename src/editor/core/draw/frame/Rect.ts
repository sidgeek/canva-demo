import { IBoundingBox } from '../../event/IBoundingBox'
import { IShapeOptions, Shape } from './Shape'

export class Rect extends Shape {
  constructor(ctx: CanvasRenderingContext2D, size: IBoundingBox, options?: IShapeOptions) {
    const {left, top, width, height } = size
    super(ctx, left, top, width, height, options)
  }

  /**
   * @param eCtx 外部传入的ctx
   */
  public render(eCtx?: CanvasRenderingContext2D) {
    const ctx = eCtx || this.ctx

    super.render()

    const {left, top, width, height} = this

    ctx.save()
    // @ts-ignore
    ctx.fillStyle = this.fillColor || 'red'
    // @ts-ignore
    ctx.strokeStyle = this.strokeColor || 'red'
    ctx.lineWidth = 1
    // @ts-ignore
    if (this.fillColor) {
      ctx.fillRect(left, top, width, height)
    }
    ctx.strokeRect(left, top, width, height)
    ctx.restore()
  }
}
