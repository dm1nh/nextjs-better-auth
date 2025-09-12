import { env } from "@/env"
import nodemailer, { type SendMailOptions } from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
})

const mailer = {
  async send(params: SendMailOptions) {
    const info = await transporter.sendMail({
      from: '"SEA" <sea@gmail.com>',
      ...params,
    })
    return info.messageId
  },
}

export default mailer
