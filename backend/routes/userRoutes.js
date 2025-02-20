const express = require("express");
const { register, confirm } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/confirm", confirm);

module.exports = router;
