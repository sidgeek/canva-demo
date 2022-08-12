import { IBoundingBox } from '../IBoundingBox'
import IRenderable from '../IRenderable'
import { Draw } from '../../draw/Draw'
import { IPosition } from '../../../interface/Draw'

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
    public draw: Draw,
    options: IHoverZoneOptions = {},
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destructor() { }

  render() {
    // this.store.ctx.strokeStyle = 'red';
    // this.store.ctx.strokeRect(this.left, this.top, this.width, this.height);
    // this.store.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // this.store.ctx.fillRect(this.left, this.top, this.width, this.height);
  }

  move(dx: number, dy: number) {
    this.left += dx
    this.top += dy
  }

  addWidthHeight(dx: number, dy: number) {
    this.width += dx
    this.height += dy
  }

  isPosInShapeInner(pos: IPosition) {
    const {x, y} = pos
    return (x >= this.left) &&
      (y >= this.top) &&
      (x <= this.left + this.width) &&
      (y <= this.top + this.height)

  }
}
