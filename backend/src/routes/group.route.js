import express from "express";
import {
  createGroup,
  addMember,
  removeMember,
  getGroup,
  getGroupMessages,
  sendGroupMessage
} from "../controllers/group.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createGroup);
router.post("/:groupId/add-member", protectRoute, addMember);
router.post("/:groupId/remove-member", protectRoute, removeMember);
router.get("/:groupId", protectRoute, getGroup);
router.get("/:groupId/messages", protectRoute, getGroupMessages);
router.post("/:groupId/messages", protectRoute, sendGroupMessage);

export default router;
