import { Draw } from '../draw/Draw'
import { CanvasEvent } from './CanvasEvent'

export class GlobalEvent {

  private draw: Draw
  private canvas: HTMLCanvasElement
  private canvasEvent: CanvasEvent

  constructor(draw: Draw, canvasEvent: CanvasEvent) {
    this.draw = draw
    this.canvas = draw.getCanvas()
    this.canvasEvent = canvasEvent
  }

  public register() {
    document.addEventListener('keyup', () => {
      console.log('')
    })
    document.addEventListener('click', (evt) => {
      console.log('')
    })
    document.addEventListener('mouseup', () => {
      console.log('')
    })
    document.addEventListener('wheel', (evt: WheelEvent) => {
      console.log('')
    }, { passive: false })
  }
}
