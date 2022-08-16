import { IShapeOptions } from './frame/Shape'

export const FakeNodeConfigs: IShapeOptions[] = [
  {
    type: 'rect',
    left: 30,
    top: 30,
    width: 100,
    height: 100,
    // fillColor: '#333',
    id: 1,
  },
  {
    type: 'rect',
    left: 400,
    top: 30,
    width: 100,
    height: 100,
    strokeColor: 'blue',
    id: 2,
  },
  {
    type: 'polygon',
    left: 300,
    top: 300,
    width: 100,
    height: 50,
    id: 3,
    points: [
      { x: 400, y: 350 },
      { x: 300, y: 350 },
    ],
  },
]
