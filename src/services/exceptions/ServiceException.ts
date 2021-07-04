import { ClientException } from '../../exceptions/ClientException';

export class ServiceException extends ClientException {

  constructor(message: string) {
    super(message);
  }
}
