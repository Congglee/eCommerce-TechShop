import nodemailer from "nodemailer";

const sendMail = async ({ email, html, subject }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Tech-Shop" <no-reply@techshop.com>',
    to: email,
    subject: subject,
    html: html,
  });

  return info;
};

export { sendMail };
