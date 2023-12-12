// Written by Frederick
// Version 1
// Last update: 2023-12-11
export interface DataConnector<T> {
  get: (predicates: Object[]) => Promise<T[]>;
  save: (entity: T) => Promise<void>;
  delete: (entity: T) => Promise<void>;
}
