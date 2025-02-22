const { Contacts } = require("../../models/index");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.find();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
