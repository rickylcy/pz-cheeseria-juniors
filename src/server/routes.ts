import * as express from 'express';
const connection = require("./connect");
const cheeses = require('./data/cheeses.json');
var bodyParser = require('body-parser')
require('dotenv').config();

// create application/json parser
var jsonParser = bodyParser.json()

const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

// GET method to get all the recent purchase from database
router.get('/api/recent', (req, res, next) => {
    const query = `SELECT * FROM cheeseriadb.cheeseria`;
    connection.query(query, (err: any, results: any, fields: any) => {
        if (err) throw err
      
        console.log('The solution is: ', results)
        res.json(results);
      })
});

// POST method to send all the items purchased from client to the server
router.post('/api/purchase',jsonParser,  (req, res, next) => {
    // Retreive data from client
    const total = req.body.total;
    const cartItems = req.body.cartItems;

    // String to store items list for the database
    var itemsStr = "";
    Object.keys(cartItems).forEach((key) => {
        itemsStr = itemsStr + cartItems[key].amount + " " + cartItems[key].title + ","
    })
    itemsStr = "'" + itemsStr + "'";

    const query = `INSERT INTO cheeseriadb.cheeseria (items, total) VALUES (${itemsStr}, ${parseFloat(total)})`;
    //const query = `select * from purchase_history`
    connection.query(query, (err: any, results: any, fields: any) => {
        if (err) throw err
      
        console.log('The solution is: ', results)
        return results;
      })
    res.json('POST request to the homepage')
});


export default router;