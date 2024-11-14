import { connectToDB, closeConnection }  from './db.js';

async function performDBOperation() {
  try {
    const db = await connectToDB();
    
    // do something here
    
  } catch (err) {
    console.error('An error occurred', err);
  } finally {
    // Close the connection
    await closeConnection();
  }
}

performDBOperation();