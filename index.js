//1
const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51L14pjDEsxnXfJbTlrS3grchkKNLNJquxxzz79aQiElQwp6RcnTeEJIRskV7INrmUt7vBTFS2pWMTokjKFP0nbIC00bPMze6Az')


//3
const cors = require('cors')
require('dotenv').config()

//4
app.use(cors())
app.use(express.json())

//5 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajito.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri);


async function run() {
    try {
        //7
        await client.connect();
        const toolsCollection = client.db("plumbtion-manufacturer").collection("tools");
        const reviewsCollection = client.db("plumbtion-manufacturer").collection("reviews");
        const ordersCollection = client.db("plumbtion-manufacturer").collection("orders");
        const usersCollection = client.db("plumbtion-manufacturer").collection("users");
        const paymentsCollection = client.db("plumbtion-manufacturer").collection("payments");


        // ***    Tools (pipes)        **//

        //8 get tool 
        app.get('/tool', async (req, res) => {
            const query = {}
            const tools = await toolsCollection.find(query).toArray()
            res.send(tools)
        })

        //9 get single tool 
        app.get('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tool = await toolsCollection.findOne(query)
            res.send(tool)
        })

        //23 add tool (pipes)
        app.post('/tool', verifyJWT, verifyAdmin, async (req, res) => {
            const pipe = req.body
            const result = await toolsCollection.insertOne(pipe)
            res.send(result)
        })

        //24 delete tool (pipe) 
        app.delete('/tool/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const tools = await toolsCollection.deleteOne(query)
            res.send(tools)
        })

    }
    finally {
        //   await client.close();
    }
}
run().catch(console.dir);

//2
app.get('/', (req, res) => {
    res.send('Plumbing server is running')
})

app.listen(port, () => {
    console.log('server running on ', port);
})