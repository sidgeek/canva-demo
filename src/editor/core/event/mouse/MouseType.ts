import { IPosition } from '../../../interface/Draw'
import VNode from '../../draw/node'
import CursorType from '../CursorType'

export const MouseButtonsType =  {
  none: 0,
  left: 1,
  middle: 4,
  right: 2,
}

export interface IMouseButtonsType {
  hover: {
    target: VNode | null,
    topLayerZIndex: number,
    topLayerCursorType: CursorType,
  },
  lastX: number,
  lastY: number,
  dragStart: IPosition | null
  dragged: boolean,
  dragTarget: VNode | null
  dragTargetInitPosition: IPosition
}

