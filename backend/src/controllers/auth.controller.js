import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addFriend = async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.body;
  if (!friendId) return res.status(400).json({ message: "Friend ID required" });
  if (userId.toString() === friendId) return res.status(400).json({ message: "Cannot add yourself as friend" });
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!friend) return res.status(404).json({ message: "Friend not found" });
    if (user.friends.includes(friendId)) return res.status(400).json({ message: "Already friends" });
    user.friends.push(friendId);
    await user.save();
    res.status(200).json({ message: "Friend added" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFriend = async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.body;
  if (!friendId) return res.status(400).json({ message: "Friend ID required" });
  try {
    const user = await User.findById(userId);
    if (!user.friends.includes(friendId)) return res.status(400).json({ message: "Not in friends list" });
    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();
    res.status(200).json({ message: "Friend removed" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const blockUser = async (req, res) => {
  const userId = req.user._id;
  const { blockId } = req.body;
  if (!blockId) return res.status(400).json({ message: "Block ID required" });
  if (userId.toString() === blockId) return res.status(400).json({ message: "Cannot block yourself" });
  try {
    const user = await User.findById(userId);
    const toBlock = await User.findById(blockId);
    if (!toBlock) return res.status(404).json({ message: "User not found" });
    if (user.blocked.includes(blockId)) return res.status(400).json({ message: "Already blocked" });
    user.blocked.push(blockId);
    // Optionally remove from friends
    user.friends = user.friends.filter(id => id.toString() !== blockId);
    await user.save();
    res.status(200).json({ message: "User blocked" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const unblockUser = async (req, res) => {
  const userId = req.user._id;
  const { blockId } = req.body;
  if (!blockId) return res.status(400).json({ message: "Block ID required" });
  try {
    const user = await User.findById(userId);
    if (!user.blocked.includes(blockId)) return res.status(400).json({ message: "User not blocked" });
    user.blocked = user.blocked.filter(id => id.toString() !== blockId);
    await user.save();
    res.status(200).json({ message: "User unblocked" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriends = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).populate('friends', 'fullName email profilePic');
    res.status(200).json({ friends: user.friends });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlocked = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).populate('blocked', 'fullName email profilePic');
    res.status(200).json({ blocked: user.blocked });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUserByName = async (req,res)=>{

  const userName = req.params
  try {
  const user = await User.findOne({ fullName: userName }).select('fullName email profilePic');
    
  if(!user)  return res.status(404).json({ message: "User not found" })
    res.status(200).json(user);


  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });

  }


}