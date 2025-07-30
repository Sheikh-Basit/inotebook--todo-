require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongo = () => {
  // mongoose.connect('mongodb://localhost:27017/inotebookTest').then(() => {
  // Connect to MongoDB Atlas
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
};

module.exports = connectToMongo;
