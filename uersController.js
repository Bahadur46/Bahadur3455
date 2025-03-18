import User from "../Model/userModel.js";
import mongoose from "mongoose";

// Create user
export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { Email } = userData;

        // Check if user already exists
        const userExist = await User.findOne({ Email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        
        const newUser = await userData.save();
        res.status(200).json(newUser);
    } catch (error) {
        
        res.status(500).json({ Error: error.message || "Internal server error" });
    }
};

export const fetch = async (req, res) => {
    try {
        const userData = await User.findOne();

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(userData); 

    } catch (error) {
        console.error(error);  
        return res.status(500).json({ message: 'Internal server error' });
    }
};





export const update = async (req, res) => {
    try {
        const { id } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Check if user exists
        const existUser = await User.findById(id);
        if (!existUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true});

        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update user" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser=async(req,res)=>{
    try {
        const { id } = req.params;

        // Check if user exists
        const existUser = await User.findById(id);
         await User.findByIdAndDelete(existUser);
         res.status(201).json({message:"Deleted Successfully"});
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}




