const express = require("express");
const app = express();
require("dotenv").config()
const cors= require("cors")
const cookieParser= require("cookie-parser")
const PORT = process.env.PORT || 4000;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST','PUT','DELETE','GET'],
}))
 
const todo= require("./routes/todoRoutes")
require("./config/db") 

app.use(express.json())
app.use(cookieParser())






  
// app.get('/', (req, res) => {
//     res.send({
//         message: "hello from index"
//     })
// })

// router_______________________________

app.use("/api/v1",todo)



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


 