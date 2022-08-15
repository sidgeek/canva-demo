import { IBoundingBox } from '../../event/IBoundingBox'
import IRenderable from '../../event/IRenderable'
import { IPosition } from '../../../interface/Draw'

export interface IShapeOptions {
}

export class Shape implements IBoundingBox, IRenderable {
  public isMouseHovering = false;

  constructor(
    public ctx: CanvasRenderingContext2D,
    public left: number,
    public top: number,
    public width: number,
    public height: number,

    options: IShapeOptions = {},
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
