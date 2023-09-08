const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shivamatlas:c8EArpFPe7Pq5fBt@cluster0.mymes8q.mongodb.net/todolist?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Database conneted")
}).catch((err) => {
    console.log(err)
})  