import './style.css'
import Editor from './editor'

window.onload = function () {

  // 1. 初始化编辑器
  const container = document.querySelector<HTMLDivElement>('.editor')!

  const canvas = document.querySelector<HTMLCanvasElement>('canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const instance = new Editor(container, ctx)
  console.log('实例: ', instance)
}
