import { ClientException } from '../../exceptions/ClientException';

export class ControllerClientException extends ClientException {

  constructor(message: string) {
    super(message);
  }
}
