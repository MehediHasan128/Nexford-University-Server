import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async(to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === 'production', // true for port 465, false for other ports
        auth: {
          user: "bayzidahmed467@gmail.com",
          pass: config.smtp_secreat_credential
        },
      });

      await transporter.sendMail({
        from: 'bayzidahmed467@gmail.com', // sender address
        to, // list of receivers
        subject: "Passsord reset link", // Subject line
        text: "", // plain text body
        html // html body
      });
}