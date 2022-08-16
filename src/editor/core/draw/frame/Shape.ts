import { IBoundingBox } from '../../event/IBoundingBox'
import IRenderable from '../../event/IRenderable'
import { IPosition } from '../../../interface/Draw'

export interface IShapeOptions extends IBoundingBox {
  strokeColor?: string;
  fillColor?: string;
  id?: number;
  points?: IPosition[];
}

export class Shape implements IBoundingBox, IRenderable {
  public isMouseHovering = false;
  public left: number;
  public top: number;
  public width: number;
  public height: number;

  constructor(public ctx: CanvasRenderingContext2D, options: IShapeOptions) {
    this.left = options.left
    this.top = options.top
    this.width = options.width
    this.height = options.height

    Object.entries(options).forEach(([key, value]) => {
      if (['left', 'top', 'width', 'height'].indexOf(key) == -1) {
        // @ts-ignore
        this[key] = value
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destructor() {}

  render(eCtx?: CanvasRenderingContext2D) {
    // this.store.ctx.strokeStyle = 'red';
    // this.store.ctx.strokeRect(this.left, this.top, this.width, this.height);
    // this.store.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // this.store.ctx.fillRect(this.left, this.top, this.width, this.height);
  }

  move(dx: number, dy: number) {
    this.left += dx
    this.top += dy
  }

  updateStart(x: number, y: number) {
    this.left = x
    this.top = y
  }

  addWidthHeight(dx: number, dy: number) {
    this.width += dx
    this.height += dy
  }

  isPosInShapeInner(pos: IPosition, gap = 0) {
    const { x, y } = pos
    return (
      x >= this.left - gap &&
      y >= this.top - gap &&
      x <= this.left + this.width + gap &&
      y <= this.top + this.height + gap
    )
  }
}
