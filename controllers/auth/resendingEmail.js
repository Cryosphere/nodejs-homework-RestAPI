const { User } = require("../../models/index");
const sendEmail = require("../../utils/sendEmail");

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

    await sendEmail(email, user.verificationToken);

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendingEmail;
