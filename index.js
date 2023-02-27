const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middle ware 
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y4rzkw4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const attarCollection = client.db('Islamic').collection('Attars');
        
        // get product api
        app.get('/attars', async (req, res) => {
            const query = {};
            const cursor = attarCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // get product details api
       /*  app.get('/attar/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await attarCollection.findOne(query);
            res.send(product);
        }); */


    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(('hello from Mahsez_server'));
});

app.listen(port, () => {
    console.log(`Mahsez_server app listening on port${port})`);
});