import mongoose from 'mongoose';

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected Successfully !!`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;




// import {connect} from 'mongoose'

// const connectDB = async()=>{
//    try{
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected Successfully !!")

//    }catch(err){
//      console.log(err);
//      process.exit (1);
//    }
// }

// export default connectDB;