import { IBoundingBox } from '../../../event/IBoundingBox'
import { Shape } from '../Shape'
// import { Canvg } from 'canvg'

// function createPatternImage(width: number) {
//   const size = width / 40
//   const ctx = document.createElement('canvas').getContext('2d') as any
//   ctx.canvas.width = ctx.canvas.height = size  // = size of pattern base
//   ctx.fillStyle = '#c9bebe'
//   ctx.arc(size/2, size/2, size/16, 0, Math.PI * 2)
//   ctx.fill()
//   return ctx.canvas                          // canvas can be used as image source
// }

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

    // const pattern = ctx.createPattern(createPatternImage(rWidth), 'repeat')
    // // @ts-ignore
    // ctx.fillStyle = pattern
    // ctx.fillRect(0, 0, rWidth, rHeight)

  }

}
