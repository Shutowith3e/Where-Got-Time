import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";
import {
	getGroups,
	getUserEvents,
	getUserPersonalGroup
}from '../controllers/userController.js';

//router.get
//router.post etc etc for each of the routes
router.post('/getGroups',getGroups);
router.post('/getUserEvents',getUserEvents);
router.post('/getUserPersonalGroup', getUserPersonalGroup);
export default router;
