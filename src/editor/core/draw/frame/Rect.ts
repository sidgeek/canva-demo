import { IBoundingBox } from '../../event/IBoundingBox'
import { Shape } from './Shape'
import { Draw } from '../Draw'

export class Rect extends Shape {
  constructor(draw: Draw, size: IBoundingBox) {
    const {left, top, width, height } = size
    super(left, top, width, height, draw)
  }

  public render() {
    super.render()

    const {left, top, width, height} = this
    const ctx = this.draw.ctx
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.lineWidth = 15
    ctx.fillRect(left, top, width, height)
    ctx.restore()
  }
}
