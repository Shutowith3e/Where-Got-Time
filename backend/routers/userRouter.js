import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";
import {
	getGroups,
	getUserEvents,
	getUserPersonalGroup,
	getUserClashes
}from '../controllers/userController.js';

//router.get
//router.post etc etc for each of the routes
router.post('/getGroups',getGroups);
router.post('/getUserEvents',getUserEvents);
router.post('/getUserPersonalGroup', getUserPersonalGroup);
router.post('/getUserClashes', getUserClashes);

export default router;
