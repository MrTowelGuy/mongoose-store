//kyler helped me link my code for this section. 
//DEPENDENCIES
const express = require('express')
const productsRouter = express.Router(); //this basically creates the route that will connect to my route section in my server.js
const Store = require ('../models/products')// connects to my products in the models folder

//SEED
productsRouter.get('/seed', (req,res) => {
  Store.create(

    [
        {
          name: 'Beans',
          description: 'A small pile of beans. Buy more beans for a big pile of beans.',
          img: 'https://imgur.com/LEHS8h3.png',
          price: 5,
          qty: 99
        }, {
          name: 'Bones',
          description: "It's just a bag of bones.",
          img: 'https://imgur.com/dalOqwk.png',
          price: 25,
          qty: 0
        }, {
          name: 'Bins',
          description: 'A stack of colorful bins for your beans and bones.',
          img: 'https://imgur.com/ptWDPO1.png',
          price: 7000,
          qty: 1
        },
      ],
      (error, data) => {
        res.redirect('/products');
      }
  );
});
//CODE BELOW I TOOK FROM MY SERVER.JS TO DECLUTTER


//Buy
productsRouter.put('/:id/buy', (req, res) => {
  products.findById(req.params.id, (error, foundItem) =>{
    console.log(foundItem)
    foundItem.qty -=1;
    foundItem.save();
    res.redirect(`/produts/${req.params.id}`)
  })
})

// Index (in server js)

// NEW
productsRouter.get("/new", (req, res) => {
    res.render('new.ejs')
});

// DELETE
productsRouter.delete('/:id', (req,res)=>{
  Store.findByIdAndDelete(req.params.id, (error, foundItem) =>{
    productId = req.params.id;
    res.redirect('/')
  })
})

// UPDATE
productsRouter.put('/:id', (req, res) => {
  const newItem = {
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      price: req.body.price,
      qty: req.body.qty,
  }
  products.findByIdAndUpdate(req.params.id, newItem, (error, foundItem) => {
      foundItem[req.params.id] = newItem;
      res.redirect(`/${req.params.id}`)
  })
});

// CREATE
productsRouter.post("/", (req, res) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    price: req.body.price,
    qty: req.body.qty
  }
    Store.create(newProduct, (error, foundItem) => {
        res.redirect('/');
    });
})

// EDIT
productsRouter.get('/:id/edit', (req, res) => {
  Store.findById(req.params.id, (err, foundItem) => {
      res.render('edit.ejs', {
          product: foundItem,
          productId: req.params.id
      })
  })
});

// SHOW
productsRouter.get('/:id', (req, res) => {
	Store.findById(req.params.id, (err, foundItem) => {
		res.render("show.ejs", {
			product: foundItem,
      productId: req.params.id
		});
	});
});

//exports
module.exports = productsRouter;