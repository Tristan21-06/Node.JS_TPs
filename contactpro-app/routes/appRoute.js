const express = require("express");
const router = express.Router();

const appController = require(process.env.PROJECT_DIR + "/controllers/appController");

router.get("/logout", appController.logout);

router.use((req, res, next) => {
    if (req.session?.user) {
        res.redirect('/contact');
        return;
    }

    next();
});

router.get("/register", appController.register);
router.get("/login", appController.login);
router.post("/register", appController.register);
router.post("/login", appController.login);

module.exports = router;