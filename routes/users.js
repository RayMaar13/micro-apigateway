const express = require('express');
const router = express.Router();

const usersHandler = require("./handler/users");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken ,usersHandler.getUser)
router.put("/", verifyToken ,usersHandler.update)
router.post("/login", usersHandler.login);
router.post("/register", usersHandler.register);
router.post("/logout", verifyToken , usersHandler.logout);

module.exports = router;
