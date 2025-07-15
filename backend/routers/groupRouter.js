import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";
//route creation
import {
    checkAdmin,
    createGroup,
    getGroupDetails,
    getGroupMembers,
    getGroupEvents,
    getAdmins,
    acceptGroupInvite,
    rejectGroupInvite,
    searchEmails,
    leaveGroup,
    getPendingGroups,
} from '../controllers/groupController.js';


//router.get
//router.post etc etc for each of the routes
// route definition
router.patch("/acceptGroupInvite", acceptGroupInvite);
router.post("/checkAdmin", checkAdmin);//changed to checkAdmin
router.post("/createGroup", createGroup);
router.post("/groupAdmins", getAdmins); 
router.post("/groupDetails", getGroupDetails);
router.post("/groupEvents", getGroupEvents);
router.post("/groupMembers", getGroupMembers);
router.delete("/leaveGroup",leaveGroup)
router.get("/searchEmails", searchEmails);
router.post("/getPendingGroups", getPendingGroups);
router.patch("/rejectGroupInvite",rejectGroupInvite)


// export router
export default router;