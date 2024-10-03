import mongoose from "mongoose";
const Port='mongodb://localhost:27017/Habits'

const connect = async () => {
  await mongoose.connect(Port);
  console.log("mongose is connected");
};

export default connect;