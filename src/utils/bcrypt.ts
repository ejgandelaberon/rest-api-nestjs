import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string) {
  try {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(rawPassword, salt);
  } catch (err) {
    throw new Error(err);
  }
}
