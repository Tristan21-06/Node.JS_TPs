const express = require("express");
const router = express.Router();

const contactController = require(process.env.PROJECT_DIR + "/controllers/contactController");

router.use((req, res, next) => {
    if (!req.session?.user) {
        res.redirect('/login');
        return;
    }

    next();
});

router.get("/", contactController.getContacts);
router.get("/new", contactController.createContact);
router.post("/new", contactController.createContact);
router.get("/edit/:id", contactController.updateContact);
router.post("/edit/:id", contactController.updateContact);
router.get("/delete/:id", contactController.deleteContact);
router.get("/:id", contactController.getContact);

module.exports = router;