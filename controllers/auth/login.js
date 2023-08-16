const { User } = require("../../models/index");
const { joiSchema } = require("../../models/users");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
// const SECRET_KEY = "r8S497ux79ux";

const login = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const error = new Error("Field filled incorrectly");
      error.status = 400;
      throw error;
    }
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.verify) {
      throw new Unauthorized(
        "Email is wrong or not verify, or password is wrong"
      );
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "sucess",
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
