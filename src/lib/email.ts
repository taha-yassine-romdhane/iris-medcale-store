import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will not work.');
}

export async function sendVerificationEmail(email: string, token: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    throw new Error('Email service is not configured');
  }

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Elite Medicale <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email address - Elite Medicale Service',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="http://51.75.18.81:3000/logo.png" alt="Elite Medicale Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #333; text-align: center;">Welcome to Elite Medicale Service!</h2>
          <p style="color: #555; text-align: center;">Thank you for registering. Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #555; text-align: center;">Or copy and paste this link into your browser:</p>
          <p style="color: #555; text-align: center; word-break: break-all;">${verificationUrl}</p>
          <p style="color: #555; text-align: center;">This link will expire in 24 hours.</p>
          <p style="color: #555; text-align: center;">If you did not create an account, please ignore this email.</p>
          <div style="text-align: center; margin-top: 30px; color: #888; font-size: 14px;">
            <p>Elite Medicale Service</p>
            <p>Contact us: support@elitemedicale.com</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email. Please try again later.');
  }
}