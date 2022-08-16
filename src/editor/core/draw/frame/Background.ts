import { IShapeOptions, Shape } from './Shape'

export class Background extends Shape {
  constructor(public ctx: CanvasRenderingContext2D, options: IShapeOptions) {
    super(ctx, options)
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
