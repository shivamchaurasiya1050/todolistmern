const express= require("express");
const { addTodo, loginTodo, updateTodo, deleteTodo, getAllTodo } = require("../controller/todoController");
const {verifyToken}= require("../config/auth")


const router= express.Router();


router.route("/register").post(addTodo);
router.route("/alltodo").get(getAllTodo)
router.route("/login").post(loginTodo);
router.route("/update/:id").put(updateTodo);
router.route("/delete/:id").delete(deleteTodo)

module.exports=router