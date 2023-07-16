import * as bcrypt from 'bcrypt';

export class _hashedpassword {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async compare(password: string, hashPassWord: string): Promise<string> {
    return await bcrypt.compare(password, hashPassWord);
  }
}
