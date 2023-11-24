const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  email: String,
});
const Product = mongoose.model('Person', personSchema,);
module.exports = Product;