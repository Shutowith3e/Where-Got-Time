import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";
//route creation
import { 
    checkAdmin, 
    createGroup, 
    deleteGroup, 
    getGroupName, 
    getGroupMembers, 
    getGroupEvents,
    addMember,
    deleteMember,
    makeAdmin,
    removeAdmin,
    getAdmins
    } 
from '../controllers/groupController.js';


//router.get
//router.post etc etc for each of the routes
// route definition
router.post("/checkAdmin", checkAdmin);//changed to checkAdmin
router.post("/createGroup", createGroup);
router.post("/deleteGroup", deleteGroup);
router.post("/addMember", addMember);
router.post("/deleteMember", deleteMember);
router.post("/makeAdmin", makeAdmin);
router.post("/removeAdmin", removeAdmin);


router.get("/groupName", getGroupName);
router.get("/groupMembers", getGroupMembers);
router.get("/groupEvents", getGroupEvents);
router.get("/groupAdmins", getAdmins);

// export router
export default router;