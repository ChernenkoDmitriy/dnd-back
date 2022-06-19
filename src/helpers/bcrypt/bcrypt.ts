import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, +process.env.BCRYPT_SALT);

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const result: boolean = await bcrypt.compare(password, hash);

  return result;
};
