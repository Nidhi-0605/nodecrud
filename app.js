const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for nidhi database
// mongoose.connect('mongodb://127.0.0.1/nidhi', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// for ramu database 
// mongoose.connect('mongodb://127.0.0.1/Ramu', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// for data database
mongoose.connect('mongodb://127.0.0.1/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// perform curd operation start

// for product model
// const Product = require('./models/product');

// for person model
// const Product = require('./models/person');


// app.get('/products', async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
//   });
  
//   app.post('/products', async (req, res) => {
//     const product = new Product(req.body);
//     await product.save();
//     res.json(product);
//   });
  
//   app.get('/products/:id', async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   });
  
//   app.put('/products/:id', async (req, res) => {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(product);
//   });
  
//   app.delete('/products/:id', async (req, res) => {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     res.json(product);
//   });
  
// perform curd operation end

// for data model
const Data = require('./models/data');

// post the data
  app.post('/datas', async (req, res) => {
    const data = new Data(req.body);
      // Add the current date to the data
     data.created_on = new Date();
    await data.save();
    res.json(data);
  });

// fetch all the data
  app.get('/datas', async (req, res) => {
    const datas = await Data.find();
    res.json(datas);
  });


// find the data using particular name parameter
//   app.get('/api/datas', (req, res) => {
//     // const requestedName = req.params.name;

//     const requestedName = req.query.name;

//   if (!requestedName) {
//     return res.status(400).send('Missing name parameter');
//   }
  
//     Data.aggregate([

//       // match the requested name that was entered
//       {
//         $match: { name: requestedName }
//       },
// // when enter the particular name display  name and HFMarks using the $project if it was removed then show all the data of particular name
//       { $project : {
//         _id:0,
//         name : 1 ,
//         HFMarks : 1 ,
//     }}
//        ]).exec()
//       .then(result => {
//         if (!result || result.length === 0) {
//           return res.status(404).send('No data found for the specified name');
//         }
  
//         res.json(result);
//       })
      
//   });






app.get('/api/datas', (req, res) => {
  Data.aggregate([
    {
      $match: {
        'Scorecard': {
          $elemMatch: {
            'subject': 'Math',
            'marks': { $gt: 50 }
          }
        }
      }
    },
    {
      $project: {
        name: 1,
        HFMarks: 1,
        created_on: 1,
        'Scorecard.subject': 1,
        'Scorecard.marks': 1
        // Add more fields as needed
      }
    }
    // Add more stages as needed
  ]).exec()
    .then(result => {
      if (!result || result.length === 0) {
        return res.status(404).send('No data found with Math subject marks greater than 50');
      }
      res.json(result);
    })
  
});



    
