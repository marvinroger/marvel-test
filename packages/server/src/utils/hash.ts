import crypto from 'crypto'

export const hashString = (input: string) =>
  crypto
    .createHash('md5')
    .update(input)
    .digest('hex')
