export interface ISearchResultBasic {
  index: number;
  groupId: string;
}

export interface ISearchResultRestArgs {
  tableIndex?: number;
  trIndex?: number;
  tdIndex?: number;
  tdId?: string;
  startIndex?: number;
}

export type ISearchResult = ISearchResultBasic & ISearchResultRestArgs
