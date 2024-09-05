import { ReadStream } from 'fs';

export const streamToBufferPromise = (createReadStream: () => ReadStream) => {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    const stream = createReadStream();

    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
  });
};
