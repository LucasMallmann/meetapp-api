import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
    });
  }

  /**
   * Sends the message
   * @param {object} message
   * @returns {Promise}
   */
  sendMail(message) {
    this.transporter.sendMail({
      ...message,
    });
  }

  configureTemplates() {}
}

export default new Mail();
