import { ModelId } from '../models/Base';

export interface CustomerCreateRequest {
  id: string;
  name: string;
  lastname: string;
  createdBy: ModelId;
}
