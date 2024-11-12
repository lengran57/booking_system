import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get('NODEMAILER_HOST'),
      port: configService.get('NODEMAILER_PORT'),
      secure: false,
      auth: {
        user: configService.get('NODEMAILER_AUTH_USER'),
        pass: configService.get('NODEMAILER_AUTH_PASSWORD'),
      },
    });
  }
  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '冷然民宿预定系统验证码',
        address: this.configService.get('NODEMAILER_AUTH_USER'),
      },
      to,
      subject,
      html,
    });
  }
}
