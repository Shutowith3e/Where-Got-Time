import express from "express";
const router = express.Router();
import {
    deleteGroup,
    addGroupMember,
    deleteGroupMember,
    makeAdmin,
    removeAdmin,
} from '../controllers/adminController.js'

router.post("/addGroupMember", addGroupMember);
router.post("/deleteGroupMember", deleteGroupMember);
router.post("/removeAdmin", removeAdmin);
router.delete("/deleteGroup", deleteGroup);
router.put("/makeAdmin", makeAdmin);
export default router;