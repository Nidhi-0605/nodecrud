const mongoose = require('mongoose');

// making a schema 
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});
// making a model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
