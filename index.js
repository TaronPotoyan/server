const exp = require('express');
const app = exp();
const port = 8080;
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://localhost:27017");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.get('/', function (req, res) {
    res.send("Hello World");
});

app.post('/', async function (req, res) {
    const { name, price } = req.body; 
    
        await client.connect();
        const database = client.db("MyDB");
        const collection = database.collection('ycollection');
        const result = await collection.insertOne({ name: name, price: price });
        res.send(`Received data - Name: ${name}, Price: ${price}`);
});

app.listen(port, function () {
    console.log('App is listening');
});
