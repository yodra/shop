import { injectable } from 'inversify';
import { ReadStream } from 'fs';
import { Config } from '../configurations/Config';
import { S3 } from 'aws-sdk';

@injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      apiVersion: '2006-03-01',
      accessKeyId: Config.aws.accessKeyId,
      secretAccessKey: Config.aws.secretAccessKey,
      region: Config.aws.region
    });
  }

  async upload(filePath: string, file: ReadStream): Promise<string> {
    return new Promise((resolve, reject) => {
      const params: S3.Types.PutObjectRequest = {
        Bucket: Config.aws.s3Bucket,
        Key: filePath,
        Body: file,
        ACL: 'public-read'
      };

      this.s3.upload(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.Key);
        }
      });
    });
  }
}
