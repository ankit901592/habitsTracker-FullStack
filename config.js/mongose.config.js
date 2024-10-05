

import mongoose from "mongoose";

const connect = async () => {
  mongoose.connect(process.env.MONGO_URI, {
    ssl: true,
    tlsInsecure: false,
  }).then(() => {
    console.log("Connected to MongoDB with TLS");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  })
};

export default connect;

