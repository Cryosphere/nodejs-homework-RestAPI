const { User } = require("../../models/index");
const nodemailer = require("nodemailer");

const resendingEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("missing required email field");
      error.status = 400;
      throw error;
    }

    if (user.verify) {
      const error = new Error("verification has already been passed");
      error.status = 400;
      throw error;
    }

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
      html: `<a target='_blanck' href='https://contacts-fh3s.onrender.com/users/verify/'>Подтвердить email</a>`,
    };

    await emailTransport
      .sendMail(emailConfig)
      .then(() => console.log("Email send success"))
      .catch((error) => console.log(error));

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendingEmail;
