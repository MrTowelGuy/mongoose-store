// DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override")

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(express.static("public"))

// DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ROUTES
const productsController = require('./controller/storeSeeds');
app.use('/products', productsController)



// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`It's me, ya boy, on port: ${PORT}`)
})