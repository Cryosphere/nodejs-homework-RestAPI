const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers/index");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", ctrl.updateById);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
