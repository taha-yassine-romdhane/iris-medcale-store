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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Elite Medicale Service!</h2>
          <p>Thank you for registering. Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
              Verify Email Address
            </a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p>${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>If you did not create an account, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message);
    }
    
    return data;
  } catch  {
    console.error('Error sending verification email:');
    throw new Error('Failed to send verification email. Please try again later.');
  }
}
