const { User } = require('../../models/index');
const Joi = require('joi');

const joiSchema = Joi.object({
  subscription: Joi.string().allow('starter', 'pro', 'business'),
});

const updateSubscriptionUser = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const error = new Error('field filled out incorrectly');
      error.status = 400;
      throw error;
    }
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    res.json({
      status: 'success',
      code: 201,
      message: 'fields updated',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscriptionUser;
