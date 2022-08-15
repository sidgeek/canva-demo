import { Draw } from '../../Draw'
// import { Canvg } from 'canvg'

export class Background {

  constructor(public draw: Draw) {}

  public render() {
    const ctx = this.draw.ctx
    const { width, height } = this.draw.getOptions()
    ctx.save()
    ctx.fillStyle = '#c9bebe'
    ctx.fillRect(0, 0, width, height)
    ctx.restore()

    const data = `
    <svg width="100px" height="100px">
      <line x1="0" y1="50" x2="100" y2="50" stroke-width="8px" stroke="red" />
      <line x1="50" y1="0" x2="50" y2="100" stroke-width="8px" stroke="red" />
    </svg>
    `

    const img = new Image()
    const DomURL = window.URL || window.webkitURL || window
    const svg = new Blob([data], {type: 'image/svg+xml'})
    const url = DomURL.createObjectURL(svg)
    img.onload = function() {
      ctx.drawImage(img, 0, 0)
    }
    img.src = url

  }

}
