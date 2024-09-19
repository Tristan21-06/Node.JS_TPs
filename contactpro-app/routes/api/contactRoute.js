const express = require("express");
const router = express.Router();

const contactApiController = require(process.env.PROJECT_DIR + "/controllers/api/contactController");

router.get("/contacts", contactApiController.getContacts);
router.get("/:id", contactApiController.getContact);
router.post("/", contactApiController.createContact);
router.put("/:id", contactApiController.updateContact);
router.delete("/:id", contactApiController.deleteContact);

module.exports = router;