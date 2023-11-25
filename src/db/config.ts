import mongoose from "mongoose";

async function connectToDb() {
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.sechf6o.mongodb.net/?retryWrites=true&w=majority`,
    );
    console.log("connected to db successfully:)");
  } catch (err) {
    console.log("connection to db failed!,", err);
  }
}

export { connectToDb };
