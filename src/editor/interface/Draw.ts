export interface IPosition {
  x: number;
  y: number;
}

export interface IDrawOption {
  curIndex?: number;
  isSetCursor?: boolean;
  isSubmitHistory?: boolean;
  isComputeRowList?: boolean;
}

export interface IDrawImagePayload {
  width: number;
  height: number;
  value: string;
}

export interface IPainterOptions {
  isDblclick: boolean;
}
