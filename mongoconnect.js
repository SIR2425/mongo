  // connecting to mongoDB, single file connection
import { MongoClient } from 'mongodb';

const  DATABASE_NAME = 'testdb';

// notice: strings using var interpolation are delimited by back ticks 
const  MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

// creates a new MongoDB client instance with command monitoring
const client = new MongoClient(MONGO_URL, { monitorCommands: true });
  
let db;							// will store the connected db 
  
async function connect() {
    try {
      await client.connect(); 
      console.log("connected to mongoDB");     // success
      db = client.db();				           // if not the default db, provide the name as argument      
    } catch(err) {
      console.log("Error", err)
    } finally {
      
      // await client.close();
    } 
  }
  
  
// if you want to warrant that db and collection are instantiated.
await connect();

// use db

const collection = db.collection('testCollection');
const query = {};
const results = collection.find(query); // results is a cursor object

// Print a message if no documents were found
if (await collection.countDocuments(query) === 0) {
    console.log("No documents found!");
} else {
    console.log("Documents found!");
}

// Iterate over the results using async iterator
for await (const doc of results) {
    console.log(doc);
  }

await client.close();