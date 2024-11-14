import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

// Compile model from schema
const blogModel = mongoose.model("blogModel", blogSchema);


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
    await test();

} catch (error) {
    console.error("Failed to connect to MongoDB", error);
} finally {
    // Close the database connection when done
    await mongoose.connection.close();
    console.log("MongoDB connection with mongoose is closed");
}


async function test() {
    // create an instance of model blogModel 
    const blog_instance = new blogModel({ title: "awesome mongoose", author : "pm", body: "..."});

    // and save the new model instance asynchronously
    await blog_instance.save();

    // create and save
    await blogModel.create({ title: "mongoose for dummies", author : "pm", body: "..."});

    // modify an instance
    blog_instance.title = "cool mongoose";

    // and save the new model instance asynchronously
    await blog_instance.save();

    // find all posts authored by 'pm' returning the 'title' and 'body' fields
    const blogPosts = await blogModel.find({ author: "pm" }, "title body").exec();
    console.log(blogPosts);

    // another approach : build query in parts
    const query = blogModel.find({ author: "pm" });
    query.select("title body");         // select fields
    query.limit(5);                     // limit to 5 docs
    query.sort({ date: -1 });           // sort by date
    const blogPosts2 = await query.exec();  // exec() 
    console.log(blogPosts2);

    // find all posts authored by 'pm' returning the 'title' and 'body' fields
    const blogPostsCursor = await blogModel.find(
    { author: "pm" },
    "title",
  ).cursor();
  
  // iterate over results using cursors
  for await (const post of blogPostsCursor) {
      console.log('Post:', post);
  }

  // find all posts authored by 'pm' returning the 'title' and 'body' fields
const cursor = blogModel.find({ author: "pm" }).select("title body").cursor();

// uses cursor.next()
for (let post = await cursor.next(); post != null; post = await cursor.next()) {
  console.log("myblogpost:",post)
}
}