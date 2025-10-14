import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {  // new field
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  dob:{
    type:Date,
    required: false
  },
  pob:{
    type:String,
    required: false
  },
  tob:{
    type:String,
    required: false
  },
  zodiacSign :{
    type : String,
    required : false
  }
});

export default mongoose.model("User", userSchema);
