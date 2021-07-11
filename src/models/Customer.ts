import { Base, ModelId } from './Base';

export interface Customer extends Base {
  id: string;
  name: string;
  lastname: string;
  photo?: string;
  createdBy: ModelId;
  updatedBy?: ModelId;
}
