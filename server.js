// DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Store = require("./models/products.js")
const seed = 

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

// MIDDLEWARE  & BODY PARSER
app.use(express.urlencoded({ extended: true }));

// ROUTES
// app.get('/products/seed', (req, res) => {
//     Product.deleteMany({}, (error, allProducts) => {})
//     Product.create(storeSeed, (error, data) => {
//         res.redirect("/products")
//     })
// })

// Index
app.get('/products', (req, res) => {
	Store.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	});
});


// NEW
app.get("/products/new", (req, res) => {
    res.render('new.ejs')
});

// DELETE


// UPDATE


// CREATE
app.post("/products", (req, res) => {
    Store.create(req.body, (error, createdStore) => {
        res.send(createdBook);
    });
})

// EDIT


// SHOW
app.get('/products/:id', (req, res) => {
	Store.findById(req.params.id, (err, foundStore) => {
		res.render("show.ejs", {
			product: foundStore
		});

	});
});

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The serer is listening on port: ${PORT}`)
})