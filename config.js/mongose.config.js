import mongoose from "mongoose";
// const Port = "mongodb://localhost:27017/Habits";

const connect = async () => {
  await mongoose.connect( process.env.MONGO_URI);
  console.log('mongodb connected');
  
};

export default connect;
