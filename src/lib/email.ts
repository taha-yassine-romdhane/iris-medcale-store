import { Resend } from 'resend';
import { CartItem } from '@/types/cart';

const resend = new Resend(process.env.RESEND_API_KEY || '');

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will not work.');
}

interface DevisEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  items: {
    name: string;
    brand: string;
    type: string;
    quantity: number;
  }[];
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendVerificationEmail(email: string, token: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    throw new Error('Email service is not configured');
  }

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Elite Medicale <no-reply@elitemedicaleservices.tn>',
      to: 'contact@elitemedicaleservices.tn',
      subject: 'Verify your email address - Elite Medicale Service',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.elitemedicaleservices.tn/logo.png" alt="Elite Medicale Logo" style="max-width: 150px;">
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

export async function sendContactFormEmail(data: ContactFormData) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    throw new Error('Email service is not configured');
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Elite Medicale <no-reply@elitemedicaleservices.tn>',
      to: 'contact@elitemedicaleservices.tn',
      subject: `Nouveau message de contact de ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.elitemedicaleservices.tn/logo.png" alt="Elite Medicale Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #333; text-align: center;">Nouveau message de contact</h2>
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h3 style="color: #0070f3; margin-top: 0;">Informations du contact</h3>
            <p style="margin: 5px 0;"><strong>Nom:</strong> ${data.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p style="margin: 5px 0;"><strong>Téléphone:</strong> ${data.phone}</p>` : ''}
          </div>
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h3 style="color: #0070f3; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; margin: 10px 0;">${data.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>Ce message a été envoyé via le formulaire de contact de Elite Medicale Services.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message);
    }

    return emailData;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw new Error('Failed to send contact form email. Please try again later.');
  }
}

export async function sendDevisNotificationEmail(data: DevisEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    throw new Error('Email service is not configured');
  }

  try {
    // Format items for the email
    const itemsList = data.items.map(item => {
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${item.brand}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${item.type}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
        </tr>
      `;
    }).join('');

    const { data: emailData, error } = await resend.emails.send({
      from: 'Elite Medicale <no-reply@elitemedicaleservices.tn>',
      to: 'contact@elitemedicaleservices.tn',
      subject: `Nouvelle demande de devis #${data.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.elitemedicaleservices.tn/logo.png" alt="Elite Medicale Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #333; text-align: center;">Nouvelle demande de devis</h2>
          <p style="color: #555;"><strong>Numéro de commande:</strong> ${data.orderNumber}</p>
          <p style="color: #555;"><strong>Client:</strong> ${data.customerName}</p>
          <p style="color: #555;"><strong>Email:</strong> ${data.customerEmail}</p>
          <p style="color: #555;"><strong>Téléphone:</strong> ${data.customerPhone || 'Non spécifié'}</p>
          
          <h3 style="color: #333; margin-top: 30px;">Produits demandés:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e0e0e0;">Produit</th>
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e0e0e0;">Marque</th>
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e0e0e0;">Type</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #e0e0e0;">Quantité</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p style="color: #555; margin: 0;">Cette demande de devis a été générée automatiquement depuis le site web Elite Médicale Services.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #888; font-size: 14px;">
            <p>Elite Medicale Service</p>
            <p>Téléphone: +216 55 820 000</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message);
    }
    
    return emailData;
  } catch (error) {
    console.error('Error sending devis notification email:', error);
    throw new Error('Failed to send devis notification email. Please try again later.');
  }
}