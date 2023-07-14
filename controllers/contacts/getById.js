const { Contacts } = require("../../models/index");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.findById(contactId);
    console.log(contact);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    }
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found task id: ${contactId}`,
      data: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
