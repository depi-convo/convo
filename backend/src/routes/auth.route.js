import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
  addFriend,
  removeFriend,
  blockUser,
  unblockUser,
  getFriends,
  getBlocked,
<<<<<<< HEAD
=======
  getUserByName
>>>>>>> 508afa5 (Channels/searching Backend)
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

<<<<<<< HEAD
router.put("/update-profile", protectRoute, updateProfile); // TODO: make this for the pic and add another one for the username, name, etc
=======
router.put("/update-profile", protectRoute, updateProfile);
>>>>>>> 508afa5 (Channels/searching Backend)

router.get("/check", protectRoute, checkAuth);

// Social actions
router.post("/add-friend", protectRoute, addFriend);
router.post("/remove-friend", protectRoute, removeFriend);
router.post("/block-user", protectRoute, blockUser);
router.post("/unblock-user", protectRoute, unblockUser);
router.get("/friends", protectRoute, getFriends);
router.get("/blocked", protectRoute, getBlocked);
<<<<<<< HEAD
=======
router.get("/:userName/get-user", protectRoute, getUserByName);
>>>>>>> 508afa5 (Channels/searching Backend)

export default router;
