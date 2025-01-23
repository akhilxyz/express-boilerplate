import { SendGridConfig } from '@/config/sendgrid.config';
import sgMail from '@sendgrid/mail';

const { apiKey, email } = SendGridConfig.create()
sgMail.setApiKey(apiKey); // Make sure you set this in your environment variables

export class SendGridUtil {
    static async sendOTPEmail(to: string, otp: string): Promise<void> {
        const msg = {
            to, // Email address to send the OTP
            from: email!, // Your SendGrid verified sender email
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
            html: `<strong>Your OTP code is ${otp}</strong><br><em>It will expire in 5 minutes.</em>`,
        };

        try {
            await sgMail.send(msg);
        } catch (error: any) {
            console.error('Error sending OTP email:', error);
            throw new Error('Failed to send OTP email');
        }
    }
}
