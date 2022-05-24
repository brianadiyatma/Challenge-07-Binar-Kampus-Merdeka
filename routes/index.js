const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const upload = require("../middlewares/multer");

router.post("/post-user", upload.single("image"), controllers.postUser);
router.get("/get-all-users", controllers.getAllUsers);
router.get("/get-one-user/:userId", controllers.getOneUser);

module.exports = router;
