const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
	description: String,
	img: String,
  price:  Number,
  qty: Number
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
