// Import the mongoose module
import mongoose from 'mongoose';

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb://localhost/goosedb";

async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB with mongoose");
}

try {
    await main();
} catch (error) {
    console.error("Failed to connect to MongoDB", error);
} finally {
    // Close the database connection when done
    await mongoose.connection.close();
    console.log("MongoDB connection with mongoose is closed");
}