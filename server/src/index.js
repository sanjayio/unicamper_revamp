// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express(); // create your express app
const url = require('url');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

// make app use dependencies
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Create cached connection variable
let cachedDb = null;
let cachedCollection = null;

// A function for connecting to MongoDB,
// taking a single paramater of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1));

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

app.get('/campsites', async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('campsites');
  const campsites = await collection.find({}).toArray();
  res.status(200).json(campsites);
});

app.get('/', (req, res) => {
  res.send('Unicamper API');
});

app.listen(process.env.PORT || 3000); // client is already running on 8080
