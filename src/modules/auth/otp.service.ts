import { redisAdapter } from '@/infrastructure/cache/redis.adapter';
import { cryptoUtil } from '@/shared/utils';
import crypto from 'crypto';

// Function to generate a 6-digit OTP
function generateOTP(): string {
  const otp = crypto.randomInt(100000, 999999); // Generates a random 6-digit number
  return otp.toString();
}

// Function to store OTP in Redis
export async function storeOTP(email: string, otp: string, ttlInSeconds: number = 300): Promise<void> {
  const key = `otp:${email}`; // Unique key for each user based on email
  await redisAdapter.set(key, otp, ttlInSeconds); // Store OTP with expiration time
  console.log(`OTP for ${email} stored in Redis: ${otp}`);
}

// Function to verify OTP from Redis
export async function verifyOTP(email: string, enteredOtp: string): Promise<string> {
  const key = `otp:${email}`;

  // Fetch OTP from Redis
  const storedOtp = await redisAdapter.get(key);

  if (storedOtp === null) {
    return 'OTP has expired or does not exist.';
  }

  if (await cryptoUtil.compare(enteredOtp , storedOtp)) {
    // OTP is correct
    await redisAdapter.delete(key); // Remove OTP from Redis after verification
    return 'OTP verified successfully!';
  } else {
    return 'Invalid OTP.';
  }
}

// Function to handle OTP request (for sending via email/SMS)
export async function handleOTP(email: string): Promise<string> {
  const otp = generateOTP();
  await storeOTP(email, otp);

  // For testing, you can log or return the OTP (usually, send via email/SMS)
  return otp;
}
