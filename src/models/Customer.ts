import { Base, ModelId } from './Base';
import { Config } from '../configurations/Config';

export interface Customer extends Base {
  id: string;
  name: string;
  lastname: string;
  photo?: string;
  createdBy: ModelId;
  updatedBy?: ModelId;
}

export const toPublicUrl = (photo?: string): string | undefined =>
  photo && `${Config.aws.s3Bucket}.s3.${Config.aws.region}.amazonaws.com/${photo}`;
