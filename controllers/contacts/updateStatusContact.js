const { Contacts } = require("../../models/index");

const Joi = require("joi");

const joiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const error = new Error("missing field favorite");
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contacts.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!result) {
      const error = new Error("Not found");
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

module.exports = updateStatusContact;
