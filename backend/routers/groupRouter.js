import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";

//router.get
//router.post etc etc for each of the routes

//route creation
import { checkAdmin } from '../controllers/groupController.js';

// route definition
router.post("/checkIfAdmin", checkAdmin);

// export router
export default router;