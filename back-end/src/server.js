const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

(function run(){
    try{
        // connect to DB
        const client = mongoose.createConnection(process.env.DB_URI)
        console.log('connected to Database successfully!!')
        // define the API rountes
    }
    catch(error){
        console.log(error?.message)
    }
})()


app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
