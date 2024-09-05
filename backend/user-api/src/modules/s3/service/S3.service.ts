import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import {
  DeleteObjectRequest,
  ListObjectsV2Request,
  PutObjectRequest,
} from 'aws-sdk/clients/s3';

const Bucket = 'mmeet';

@Injectable()
export class S3Service {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  putObject(obj: Pick<PutObjectRequest, 'Body' | 'Key' | 'ContentType'>) {
    return this.s3.putObject({ ...obj, Bucket, ACL: 'public-read' }).promise();
  }

  listObjectsV2(obj: Pick<ListObjectsV2Request, 'Prefix'>) {
    return this.s3
      .listObjectsV2({
        Bucket,
        ...obj,
      })
      .promise();
  }

  deleteObject(obj: Pick<DeleteObjectRequest, 'Key'>) {
    return this.s3.deleteObject({ Bucket, ...obj }).promise();
  }
}
