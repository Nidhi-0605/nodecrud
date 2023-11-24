const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    name: String,
    HFMarks: [Number],
    Scorecard: [{
      marks: Number,
      subject: String,
    }],
    created_on: Date,
  });
  
  // Create a model based on the schema
  const Data = mongoose.model('Data', dataSchema);
module.exports = Data;