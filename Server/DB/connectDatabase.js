// import mongoose from "mongoose";

// // Connect Database
// const connection = {};

// export const connectDatabase = async () => {
//   if (connection.isConnected) {
//     return;
//   }

//   const db = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   });

//   connection.isConnected = db.connections[0].readyState;

//   console.log("MongoDB Connection Successful");
// };

import mongoose from "mongoose";

// Connect Database

export const connectDatabase = () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};
