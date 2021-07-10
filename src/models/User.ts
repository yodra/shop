import { Base } from './Base';

export interface User extends Base {
  name: string;
  isAdmin: boolean;
}
