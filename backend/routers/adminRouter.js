import express from "express";
const router = express.Router();
import {
    deleteGroup,
    inviteGroupMembers,
    deleteGroupMember,
    makeAdmin,
    removeAdmin,
	createEvent,
    deleteEvent,
	getHighPriorityEvent
} from '../controllers/adminController.js';

router.post("/createEvent", createEvent);
router.delete("/deleteEvent", deleteEvent);
router.post("/inviteGroupMembers", inviteGroupMembers);
router.delete("/deleteGroupMember", deleteGroupMember);
router.put("/removeAdmin", removeAdmin);
router.delete("/deleteGroup", deleteGroup);
router.put("/makeAdmin", makeAdmin);
export default router;