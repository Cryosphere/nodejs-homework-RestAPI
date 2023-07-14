const { Contacts } = require("../../models/index");

const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const updateById = async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      const error = new Error("missing fields");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 201,
      message: "missing fields",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
