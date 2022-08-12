import CursorType from '../CursorType'
import { IBoundingBox } from '../IBoundingBox'
import IRenderable from '../IRenderable'
import { Draw } from '../../draw/Draw'

export interface IHoverZoneOptions {
  zIndex?: number;
}

export class HoverZone implements IBoundingBox, IRenderable {
  public zIndex = 0;
  public isMouseHovering = false;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public cursorType: CursorType,
    public draw: Draw,
    options: IHoverZoneOptions = {},
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value)
    draw.ctx.canvas.addEventListener('mousemove', this.handleMouseMove)
  }

  destructor() {
    this.draw.ctx.canvas.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    // this.store.ctx.strokeStyle = 'red';
    // this.store.ctx.strokeRect(this.left, this.top, this.width, this.height);
    // this.store.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // this.store.ctx.fillRect(this.left, this.top, this.width, this.height);

    if (this.isMouseHovering) {
      if (this.zIndex >= this.draw.mouse.hover.topLayerZIndex) {
        this.draw.mouse.hover.topLayerZIndex = this.zIndex
        this.draw.mouse.hover.topLayerCursorType = this.cursorType
      }
    }
  }

  move(dx: number, dy: number) {
    this.left += dx
    this.top += dy
  }

  addWidthHeight(dx: number, dy: number) {
    this.width += dx
    this.height += dy
  }

  private handleMouseMove = (evt: MouseEvent) => {

    const rect = this.draw.ctx.canvas.getBoundingClientRect()
    const mouseX = evt.clientX - rect.left
    const mouseY = evt.clientY - rect.top

    this.isMouseHovering = (mouseX >= this.left) &&
      (mouseY >= this.top) &&
      (mouseX <= this.left + this.width) &&
      (mouseY <= this.top + this.height)

    if (this.isMouseHovering) {
      // this.draw.render()
      // console.log('>>> hover')
    }
  };
}
