import { IBoundingBox } from '../../event/IBoundingBox'
import { Shape } from './Shape'

export class Rect extends Shape {
  constructor(ctx: CanvasRenderingContext2D, size: IBoundingBox) {
    const {left, top, width, height } = size
    super(ctx, left, top, width, height)
  }

  public render() {
    super.render()

    const {left, top, width, height} = this
    const ctx = this.ctx
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.lineWidth = 15
    ctx.fillRect(left, top, width, height)
    ctx.restore()
  }
}
