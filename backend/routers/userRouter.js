import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";
import {
	getGroups,
	getEmail,
	getUserEvents
}from '../controllers/userController';

//router.get
//router.post etc etc for each of the routes
router.post('/getGroups',getGroups);
router.post('/getEmail',getEmail);
router.post('/getUserEvents',getUserEvents);
export default router;
//export default router;