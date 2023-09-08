
const Todo = require("../model/todoModel");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/token")


// register TodoList---------------------

exports.addTodo = async (req, res) => {

    console.log(req.body);
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).json("All field Required");

    }
    try {
        const preResponce = await Todo.findOne({ email: email })
        if (preResponce) {
            res.status(200).json("Your Email is already exist")
        } else {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt)

            const responce = await Todo.create({ name, email, password: hashPassword })

            if (!responce) {
                res.status(400).json({
                    success: false,
                    message: "Registration failed"
                })
            } else {
                res.status(200).json({
                    success: true,
                    responce

                })
            }

        }




    } catch (error) {
        console.log(error)

    }
}

// login----------------------------
exports.loginTodo = async (req, res) => {
    const { email, password } = req.body
    try {
        const responce = await Todo.findOne({ email: email })
        if (!responce) {
            res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })

        } else {
            const isMatchedPassword = await bcrypt.compare(password, responce.password)
            if (!isMatchedPassword) {
                res.status(400).json({
                    success: false,
                    message: "Invalid email or password"

                })
            } else {
                const token = generateToken(responce._id)
                res.cookie("token", token)

                return res.status(200).json({
                    success: true,
                    responce,
                    token

                })
            }
        }
    } catch (error) {

    }

}

// getAll Todo------------------------

exports.getAllTodo = async (req, res) => {
    try {
        const todoCount = await Todo.countDocuments();
        const responce = await Todo.find()
        if (!responce) {
            res.status(400).json({
                success: false,
                message: " Data not found"
            })

        } else {

        res.status(200).json(                
              responce
            
            )
        }

    } catch (error) {
        console.log(error)
    }

}


//   update todo---------------------------------  

exports.updateTodo = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let responce = await Todo.findById(req.params.id)
        if (!responce) {
            res.status(400).json({ message: "Todo not found!" })
        } else {
            responce = await Todo.findByIdAndUpdate(req.params.id, { name, email }, { new: true })

            if (responce) {
                res.status(200).json(responce)
            }

        }


    } catch (error) {
        console.log(error)
    }

}


//  delete todo-------------------------------

exports.deleteTodo = async (req, res) => {
    try {


        responce = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            responce
        })



    } catch (error) {
        console.log(error)
    }

}