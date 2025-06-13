import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";
//route creation
import { 
    checkAdmin, 
    createGroup, 
    getGroupName, 
    getGroupMembers, 
    getGroupEvents,
    getAdmins
    } 
from '../controllers/groupController.js';
import { acceptGroupInvite } from "../models/groupService.js";


//router.get
//router.post etc etc for each of the routes
// route definition
router.post("/checkAdmin", checkAdmin);//changed to checkAdmin
router.post("/createGroup", createGroup);

router.post("/groupName", getGroupName);
router.post("/groupMembers", getGroupMembers);
router.post("/groupEvents", getGroupEvents);
router.post("/groupAdmins", getAdmins);
router.patch("/acceptGroupInvite", acceptGroupInvite);





// export router
export default router;