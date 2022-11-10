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

//2
app.get('/', (req, res) => {
    res.send('Plumbing server is running')
})

app.listen(port, () => {
    console.log('server running on ', port);
})