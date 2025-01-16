import * as bcrypt from 'bcrypt';

class CryptoUtil {
  private readonly saltRounds = 10;

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}

export const cryptoUtil = new CryptoUtil();
