//1
const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51L14pjDEsxnXfJbTlrS3grchkKNLNJquxxzz79aQiElQwp6RcnTeEJIRskV7INrmUt7vBTFS2pWMTokjKFP0nbIC00bPMze6Az')


//2
app.get('/', (req, res) => {
    res.send('Plumbing server is running')
})

app.listen(port, () => {
    console.log('server running on ', port);
})