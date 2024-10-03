import mongoose from "mongoose";
const Port = "mongodb://localhost:27017/Habits";

const connect = async () => {
  await mongoose.connect(Port, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connect;
