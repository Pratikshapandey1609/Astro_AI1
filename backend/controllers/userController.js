import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup request:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await User.create({ name, email, password: hashedPassword });
   
     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ 
      success: true, 
      message: "User created successfully", 
      user: {
        id :newUser._id, 
        name : newUser.name,
        email : newUser.email
      },
      token
    });

  } catch (error) {
    console.error("Signup failed:", error.message);
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user :{
        id :user._id,
        name : user.name,
        email:user.email   
      }
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
};

export const updateProfile = async(req , res) =>{
   try{
     const {dob , pob , tob , zodiacSign} = req.body;

     const updatedUser = await User.findByIdAndUpdate(
       req.user._id,
       {dob , pob , tob , zodiacSign},
       {new : true}
     ).select("-password")

     res.status(200).json({message : "Profile updated successfully !!", user : updatedUser})
   
    }catch(error){
     console.log(error);
     res.status(500).json({message :"something went wrong "})
   }
}
