import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // mongoDB connection string
const dbName = 'testdb';                 // database name

let db = null;
let client = null;


async function connectToDB() {
  if (db) {
    return db;
  }
  try {
    client = new MongoClient(uri, { monitorCommands: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
    throw err;
  }
}

async function closeConnection() {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed!!!!');
      client = null; // Reset the client after closing
    }
  }
  
export { connectToDB, closeConnection };