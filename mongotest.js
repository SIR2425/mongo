// example connect, insert and iterate over results
import { MongoClient } from 'mongodb';

const  DATABASE_NAME = 'testdb';

// notice: strings using var interpolation are delimited by back ticks 
const  MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

// creates a new MongoDB client instance with command monitoring
const client = new MongoClient(MONGO_URL, { monitorCommands: true });

// most functions to query the mongoDB will be asynchronous.
// we will prefer aync/await syntax
async function main() {
    // connect to MongoDB (async)
    await client.connect();
    console.log("Connected successfully to server");

    // default database was defined in the URL 
    const database = client.db();                             // sync
    console.log(database.databaseName);

    // set a collection to interact
    const collection = database.collection('testCollection'); // sync
    // a document
    const doc = { name: 'Alice', age: 25 };

    // insert document into collection
    const result = await collection.insertOne(doc);           // async
    console.log(`Document inserted with _id: ${result.insertedId}`);

    // list all documents in collection                       // async
    const alldocs = await collection.find();
    
    // iteração assincrona dos resultados                     // async
    for await (const doc of alldocs) {
        console.log(doc);
      }

    // close the db connection (async)
    await client.close();
}

main();

