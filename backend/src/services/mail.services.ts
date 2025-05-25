import * as nodemailer from "nodemailer";
import { Injectable } from "@nestjs/common";
import { from, Subject } from "rxjs";

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jordy78@ethereal.email',
                pass: 'U1e5a7qyGkGnUV7XHf'
            }
        });
    }
    async sendPasswordResetEmail(to: string, token: string) {
        const resetLink = `http://UMS.com/reset-password?token=${token}`;
        const mailOptions = {
            from: 'Auth-backend service',
            to: to,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset.Click the link below to reset your password:</p><p><a href='${resetLink}'>Reset Password</a></p>`,
        };
        await this.transporter.sendMail(mailOptions);

    }
}
