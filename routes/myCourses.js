const express = require('express');
const router = express.Router();

const myCoursesHandler = require("./handler/myCourses");

router.get("/", myCoursesHandler.get);
router.post("/", myCoursesHandler.create);

module.exports = router;
