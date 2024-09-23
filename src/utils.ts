export interface TableRow {
  key: string;
  icon: string;
  name: string;
  height: number;
  weight: number;
  abilities: Array<string>;
  experience: string;
  type: string;
}

export interface DataStructureType {
    count: number;
    next: string;
    previous: string;
    results: Array<object>;
  }

export interface DataStructureType {
    count: number;
    next: string;
    previous: string;
    results: Array<object>;
}

export interface SortOption {
  key: string;
  isDescending: boolean | undefined;
}

export interface AttributeType {
  name: string;
  url: string;
}
