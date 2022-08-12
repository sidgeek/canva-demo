import CursorType from '../../event/CursorType'
import { IBoundingBox } from '../../event/IBoundingBox'
import { HoverZone } from '../../event/mouse/HoverZone'
import { Draw } from '../Draw'

export class Rect extends HoverZone {
  constructor(draw: Draw, size: IBoundingBox) {
    const {left, top, width, height } = size
    super(left, top, width, height, CursorType.move, draw)
  }

  public render() {
    super.render()

    if (this.isMouseHovering) {
      this.draw.mouse.topLayerCursorType = CursorType.move
    }

    const {left, top, width, height} = this
    const ctx = this.draw.ctx
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.lineWidth = 15
    ctx.fillRect(left, top, width, height)
    ctx.restore()
  }
}
