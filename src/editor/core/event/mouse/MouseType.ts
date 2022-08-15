import { IPosition } from '../../../interface/Draw'
import { Shape } from '../../draw/frame/Shape'
import CursorType from '../CursorType'

export const MouseButtonsType =  {
  none: 0,
  left: 1,
  middle: 4,
  right: 2,
}

export interface IMouseButtonsType {
  hover: {
    target: Shape | null,
    topLayerZIndex: number,
    topLayerCursorType: CursorType,
  },
  lastX: number,
  lastY: number,
  dragStart: IPosition | null
  dragged: boolean,
  dragTarget: Shape | null
  dragTargetInitPosition: IPosition
}

