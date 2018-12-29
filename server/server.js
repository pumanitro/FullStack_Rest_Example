const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const app = express();
const port = 3001;

const products = [];

const product = {
    productName: 'productName',
    productCode: 'productCode',
    productNettoPrice: 'productNettoPrice',
    productVAT: 'productVAT',
    productBruttoPrice: 'productBruttoPrice',
    productCategory: 'productCategory',
    productOptions: 'productOptions',
    rating: 'rating'
};

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));

let db;

MongoClient.connect('mongodb://admin:admin1@ds155653.mlab.com:55653/databank', (err, client) => {
    if (err) return console.log(err);
    db = client.db('databank'); // whatever your database name is
    app.listen(port, () => {
        console.log('listening on 3001')
    })
});

app.post('/products', (req, res) => {
    db.collection('products').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log(req.body.data);

        console.log('saved to database');
        products.push(req.body.product);
        res.send(req.body.product);

        console.log(products);
        //res.redirect('/')
    })

    //     db.collection('products').insertOne(req.body.product, function(err, r) {
    //     assert.equal(null, err);
    //     assert.equal(1, r.insertedCount);
    // });
    //
    // // products.push(req.body.product);
    // res.send(req.body.product);
});

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    db.collection('products').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here
    })
});


//Stary kod z react

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const app = express();
// const port = 3000;
//
// let corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
//
// app.use(cors(corsOptions));
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));
//
// const products = [];
//
// const product = {
//     productName: 'productName',
//     productCode: 'productCode',
//     productNettoPrice: 'productNettoPrice',
//     productVAT: 'productVAT',
//     productBruttoPrice: 'productBruttoPrice',
//     productCategory: 'productCategory',
//     productOptions: 'productOptions',
//     rating: 'rating'
// };
//
// // Connection URL
// const url = 'mongodb://admin:admin1@ds155653.mlab.com:55653/databank';
//
// // Database Name
// const dbName = 'myproject';
//
// let db;
//
// // Create a new MongoClient
// const client = new MongoClient(url);
//
// // Use connect method to connect to the server
// // client.connect(function(err, client) {
// //     assert.equal(null, err);
// //     console.log("Connected correctly to server");
// //
// //     db = client.db(dbName);
// // });
//
// MongoClient.connect('mongodb://admin:admin1@ds155653.mlab.com:55653/databank', (err, client) => {
//     if (err) return console.log(err);
//     db = client.db('databank'); // whatever your database name is
//     app.listen(port, () => {
//         console.log('listening on 3000')
//     })
// });
//
// // // respond with "hello world" when a GET request is made to the homepage
// app.get('/products', function (req, res) {
//
//     // const siema = db.collection('products').find({}).toArray(function(err, result) {
//     //     if (err) throw err;
//     //     console.log(result);
//     // });
//     //
//     // console.log(siema);
//     //
//     // res.send(JSON.stringify(siema));
//     // //res.send('hello world');
//
//         db.collection('products').find().toArray(function(err, results) {
//         console.log(results)
//         // send HTML file populated with quotes here
//     })
// });
//
// app.post('/products', function (req, res) {
//
//     // db.collection('products').insertOne(req.body.product, function(err, r) {
//     //     assert.equal(null, err);
//     //     assert.equal(1, r.insertedCount);
//     // });
//     //
//     // // products.push(req.body.product);
//     // res.send(req.body.product);
//
//         db.collection('products').save(req.body, (err, result) => {
//         if (err) return console.log(err);
//
//         console.log('saved to database');
//         //res.redirect('/')
//     })
// });
//
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));