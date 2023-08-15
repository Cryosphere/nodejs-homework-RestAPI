const nodemailer = require("nodemailer");
const { User } = require("../models/index");

const sendEmail = async (email) => {
  const user = await User.findOne({ email });
  const emailTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailConfig = {
    from: "Contacts App Admin <admin.example.com>",
    to: email,
    subject: "Подтверждение email",
    html: `<a target='_blanck' href='https://contacts-fh3s.onrender.com/users/verify/${user.verificationToken}'>Подтвердить email</a>`,
  };

  await emailTransport
    .sendMail(emailConfig)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error));
};

module.exports = {
  sendEmail,
};
