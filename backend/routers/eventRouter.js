import express from "express";
const router = express.Router();
//import {task1,task2,etc} from "../controllers/taskController";
import{
    createEvent,
    deleteEvent,
    getEventParticipants
} from "../controllers/eventController.js";

//router.get
//router.post etc etc for each of the routes
router.post("/createEvent", createEvent);
router.delete("/deleteEvent", deleteEvent);

router.post("/getEventParticipants", getEventParticipants);


export default router;