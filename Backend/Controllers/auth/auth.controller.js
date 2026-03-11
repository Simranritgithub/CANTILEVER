import {User} from '../../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register =async(req,res)=>{
  try {
    const {name,email,role,password}=req.body;
    const existUser = await User.findOne({email});
    if(existUser){
      return res.status(400).json({
        success:false,
        message:"User already exists"
      })
    }
      if(role==="Admin"){ const adminexists=await User.findOne({role:"Admin"})
      if(adminexists){
        return res.status(400).json({
          success:false,
          message:"Admin already exists"
        })
      }
}
     
    
    const hashed_password=await bcrypt.hash(password,10);
    const register=await User.create({
      name,email,role,password:hashed_password
    });

    return res.status(201).json({
      success:true,
      message:"User registered successfully",
      register
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Check email exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
   
     

    // 🔹 Generate token
    const token = jwt.sign(
  { id: existingUser._id, role: existingUser.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

// ✅ COOKIE SET HERE
res.cookie("accessToken", token, {
  httpOnly: true,        // ❌ JS access nahi
  secure: process.env.NODE_ENV === "production", // HTTPS in prod
  sameSite: "strict",    // CSRF protection
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

return res.status(200).json({
  success: true,
  message: "Login successful",
  User: {
    id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    
  
  }
});
  }
catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const authme=async(req,res)=>{
  try {
    const UserId=req.UserId;
    const UserData=await User.findById(UserId).populate("name email role");
    if(!UserData){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
    return res.status(200).json({
      success:true,
      User:UserData
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}