const { User } = require("../../models/index");
const { Conflict } = require("http-errors");
const { joiSchema } = require("../../models/users");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { v4 } = require("uuid");

const register = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const error = new Error("Field filled incorrectly");
      error.status = 400;
      throw error;
    }
    const { email, password, subscription } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const verificationToken = v4();

    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });
    console.log(result);

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
      html: `<a target='_blanck' href='https://contacts-fh3s.onrender.com/users/verify/${verificationToken}'>Подтвердить email</a>`,
    };

    await emailTransport
      .sendMail(emailConfig)
      .then(() => console.log("Email send success"))
      .catch((error) => console.log(error));

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
