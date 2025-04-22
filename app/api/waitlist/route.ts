import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    const MONGODB_URI = process.env.MONGODB_URI;
    const MONGODB_DB = process.env.MONGODB_DB || 'calmvault';
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(MONGODB_DB);
    const collection = db.collection('waitlist');
    
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      await client.close();
      return Response.json(
        { success: false, message: 'Email already registered on our waitlist' },
        { status: 409 }
      );
    }
    
    await collection.insertOne({
      email,
      signupDate: new Date(),
    });
    
    await client.close();
    
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        }
      });
      
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Welcome to the CalmVault Waitlist',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00A6A6;">Thank you for joining the CalmVault Waitlist</h1>
            <p>We appreciate your interest in CalmVault and are thrilled to have you as part of our waitlist community.</p>
            <div style="margin: 30px 0; padding: 20px; background-color: #f7f7f7; border-radius: 5px; border-left: 4px solid #00A6A6;">
              <p style="margin: 0;">Your email address has been successfully added to our waitlist: <strong>${email}</strong></p>
            </div>
            <p>We are working diligently to bring CalmVault to you and will provide regular updates on our progress. Stay tuned for the official launch announcement.</p>
            <p>In the meantime, feel free to connect with us on social media to stay informed about our latest developments.</p>
            <p style="margin-top: 30px;">Best regards,<br>The CalmVault Team</p>
          </div>
        `,
      };
      
      await transporter.sendMail(mailOptions);
      
      return Response.json(
        {
          success: true,
          message: 'Thanks for joining our waitlist! Check your email for confirmation.'
        },
        { status: 200 }
      );
    } catch {
      // If email fails, still return success since the database entry was created
      return Response.json(
        {
          success: true,
          message: 'Thanks for joining our waitlist! Email delivery is currently unavailable.'
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: 'An error occurred: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}