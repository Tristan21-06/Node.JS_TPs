const express = require("express");
const router = express.Router();

const userApiController = require(process.env.PROJECT_DIR + "/controllers/api/userController");

router.get("/users", userApiController.getUsers);
router.get("/:id", userApiController.getUser);
router.post("/", userApiController.createUser);
router.put("/:id", userApiController.updateUser);
router.delete("/:id", userApiController.deleteUser);

module.exports = router;