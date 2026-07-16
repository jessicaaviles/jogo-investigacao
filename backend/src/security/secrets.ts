import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = crypto.createHash('sha256')
  .update(process.env.SOLUTION_ENCRYPTION_KEY || 'development-only-change-me')
  .digest();

export const hashToken = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

export const sealSecret = (value: string) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64url')}:${tag.toString('base64url')}:${encrypted.toString('base64url')}`;
};

export const unsealSecret = (value: string) => {
  if (!value.startsWith('v1:')) throw new Error('Secret is not encrypted');
  const [, ivText, tagText, encryptedText] = value.split(':');
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivText, 'base64url'));
  decipher.setAuthTag(Buffer.from(tagText, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(encryptedText, 'base64url')), decipher.final()]).toString('utf8');
};

export const revealSecret = (value: string) => {
  try { return unsealSecret(value); } catch { return value; }
};
