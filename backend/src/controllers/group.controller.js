import Group from "../models/group.model.js";
import Message from "../models/message.model.js";

export const createGroup = async (req, res) => {
  const { name, members, description, avatar } = req.body;
  const creator = req.user._id;
  if (!name || !members || !Array.isArray(members) || members.length < 2) {
    return res.status(400).json({ message: "Name and at least 2 members required" });
  }
  try {
    const group = new Group({
      name,
      members: [...new Set([...members, creator.toString()])],
      admins: [creator],
      description,
      avatar
    });
    await group.save();
    res.status(201).json({ group });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addMember = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (!group.members.includes(req.user._id)) return res.status(403).json({ message: "Not a group member" });
    if (!group.admins.includes(req.user._id)) return res.status(403).json({ message: "Only admins can add members" });
    if (group.members.includes(userId)) return res.status(400).json({ message: "User already in group" });
    group.members.push(userId);
    await group.save();
    res.status(200).json({ message: "Member added" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeMember = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (!group.members.includes(req.user._id)) return res.status(403).json({ message: "Not a group member" });
    if (!group.admins.includes(req.user._id)) return res.status(403).json({ message: "Only admins can remove members" });
    if (!group.members.includes(userId)) return res.status(400).json({ message: "User not in group" });
    group.members = group.members.filter(id => id.toString() !== userId);
    // Optionally remove from admins as well
    group.admins = group.admins.filter(id => id.toString() !== userId);
    await group.save();
    res.status(200).json({ message: "Member removed" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate('members', 'fullName email profilePic');
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.status(200).json({ group });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await Message.find({ group: groupId }).populate('sender', 'fullName email profilePic').sort({ createdAt: 1 });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  const { groupId } = req.params;
  const sender = req.user._id;
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content required" });
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (!group.members.includes(sender)) return res.status(403).json({ message: "Not a group member" });
    const message = new Message({ sender, group: groupId, content });
    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
