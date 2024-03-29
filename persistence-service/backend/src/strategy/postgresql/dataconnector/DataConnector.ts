// Written by Frederick
// Version 2
// Last update: 2023-12-13
export interface DataConnector<T> {
  get: (predicate:T) => Promise<T[]>;
  save: (entity: T) => Promise<void>;
  delete: (entity: T) => Promise<void>;
}
