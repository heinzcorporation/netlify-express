'use strict';
const express = require('express')
const serverless = require('serverless-http');
const cors = require('cors')

const app = express()
const port = 3001

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tS7GK4PDgtoc1WqI:tS7GK4PDgtoc1WqI@cluster0.kfsxzcy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors({
    origin: '*',
	methods: ['GET','POST']
}))

app.post('/new', async (req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	const ipv4 = req.query.ipv4;
	const ipv6 = req.query.ipv6;
	// handle saving input
	await client.connect();
	const database = client.db("userdata");
	const collection = database.collection("sensitive");

	await collection.insertMany([{"ipv4":ipv4, "ipv6":ipv6}])
	res.send('received')
})

module.exports = app;
module.exports.handler = serverless(app);
