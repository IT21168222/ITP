const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

//const uri = "mongodb+srv://it21168222:my_db@cluster0.q2qsjs4.mongodb.net/my_db?retryWrites=true&w=majority"

async function connect(){
    try{
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error(error);
    }

}

connect();

// 
// mongoose.connect(URL, {
//     useCreateIndex: true,
//     useNewUrlParser : true,
//     useUnifiedTopologyL: true,
//     useFindAndModify: false
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB Connection Success!");
// })

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})

//employee.js
const employeeRouter = require("./routes/employees.js");
app.use("/employee", employeeRouter);