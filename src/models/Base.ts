export type ModelId = string;

export interface Base {
  _id: ModelId;
  createdAt: Date;
  lastUpdatedAt?: Date;
  deletedAt?: Date;
}
