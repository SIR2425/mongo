import { connectToDB, closeConnection }  from './db.js';

async function run() {
  try {
    const db = await connectToDB();
    const collection = db.collection('testCollection');
    const query = {};

    // Query the collection for all documents and get a cursor
    const cursor = collection.find(query);
    
    // Print a message if no documents were found
    if (await collection.countDocuments(query) === 0) {
      console.log("No documents found!");
    }

    // Iterate over the results using async iterator
    for await (const doc of cursor) {
      console.log(doc);
    }

    console.log("--------------------------------");
    // Alternatively, you can use toArray (not recommended for large datasets) 
    // load results into memory
  
    // if the cursor was iterated, need to rewind cursor
    cursor.rewind();
    const results = await cursor.toArray();
    results.forEach(doc => console.log(doc));

  } catch (err) {
    console.error('An error occurred', err);
  } finally {
    await closeConnection();
  }
}

run();
