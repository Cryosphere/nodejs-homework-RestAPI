const contactsOperations = require('../../models/contacts');

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const remoteContact = await contactsOperations.removeContact(contactId);
    if (!remoteContact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact delete',
      data: {
        remoteContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
