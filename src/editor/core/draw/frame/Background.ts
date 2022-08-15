import { IBoundingBox } from '../../event/IBoundingBox'
import { Shape } from './Shape'

export class Background extends Shape {
  constructor(public ctx: CanvasRenderingContext2D, size: IBoundingBox) {
    const {left, top, width, height } = size
    super(ctx, left, top, width, height)
  }

  public render() {
    const ctx = this.ctx
    const {left, top, width, height } = this

    ctx.save()
    ctx.fillStyle = '#c9bebe'
    ctx.fillRect(left, top, width, height)
    ctx.restore()
  }
}
