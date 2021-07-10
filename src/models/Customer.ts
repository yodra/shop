import { Base, ModelId } from './Base';

export interface Customer extends Base {
  id: string;
  name: string;
  lastname: string;
  image?: string;
  createdBy: ModelId;
  updatedBy?: ModelId;
}
