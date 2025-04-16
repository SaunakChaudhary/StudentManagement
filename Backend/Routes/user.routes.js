const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.route("/students").get(userController.GetAllUserData);
router.route("/students").post(userController.CreateStudent);
router.route("/students/:id").put(userController.updateStudentDetail);
router.route("/students/:id").delete(userController.deleteStudent);

module.exports = router;