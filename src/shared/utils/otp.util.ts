import Redis from 'ioredis';

const redisClient = new Redis(); // Initialize Redis client

export class OTPUtil {
    private static OTP_EXPIRATION = 300; // 5 minutes in seconds
    private static RESEND_WAIT_TIME = 30; // 30 seconds

    static generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    }

    static async storeOTP(key_: string, email: string, otp: string): Promise<void> {
        const timestamp = Date.now();
        const key = `${key_}:${email}`;
        const data = { otp, timestamp };
        await this.deleteOTP(key, key_)
        await redisClient.set(key, JSON.stringify(data), 'EX', this.OTP_EXPIRATION);
    }


    static async deleteOTP(email: string, key_: string): Promise<void> {
        const isExist = await this.getOTP(key_, email);
        if (isExist && isExist?.otp) {
            await redisClient.del(key_);
        }
    }


    static async getOTP(key_: string , email: string): Promise<{ otp: string; timestamp: number } | null> {
        const key = `${key_}:${email}`;
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    }

    static async canResendOTP(key_: string ,email: string): Promise<boolean> {
        const otpData = await this.getOTP(key_, email);
        if (!otpData) return true; // No OTP found, can resend

        const currentTime = Date.now();
        const elapsed = (currentTime - otpData.timestamp) / 1000; // Time in seconds

        return elapsed >= this.RESEND_WAIT_TIME;
    }
}
