import { Draw } from '../Draw'
// import { Canvg } from 'canvg'

function createPatternImage(width: number) {
  const size = width / 40
  const ctx = document.createElement('canvas').getContext('2d') as any
  ctx.canvas.width = ctx.canvas.height = size  // = size of pattern base
  ctx.fillStyle = '#c9bebe'
  ctx.arc(size/2, size/2, size/16, 0, Math.PI * 2)
  ctx.fill()
  return ctx.canvas                          // canvas can be used as image source
}

export class Background {

  constructor(public draw: Draw) {}

  public render() {
    const ctx = this.draw.ctx
    const { width, height } = this.draw.getOptions()
    const transform = this.draw.getTransform()

    const rWidth = width * transform.a
    const rHeight = height * transform.d

    console.log('>>> transform:', transform.a, rWidth, rHeight)

    ctx.save()
    ctx.fillStyle = '#c9bebe'
    ctx.fillRect(0, 0, width, height)
    ctx.restore()

    // const pattern = ctx.createPattern(createPatternImage(rWidth), 'repeat')
    // // @ts-ignore
    // ctx.fillStyle = pattern
    // ctx.fillRect(0, 0, rWidth, rHeight)

  }

}
