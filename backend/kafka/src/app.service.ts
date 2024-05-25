import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'daithanh1109124@gmail.com', // Email người gửi
        pass: 'tydz roqz avgm myju',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'daithanh1109124@gmail.com', // Email người gửi
      to: to,
      subject: subject,
      text: text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
