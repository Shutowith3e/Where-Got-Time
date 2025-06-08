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
router.post("/deleteEvent", deleteEvent);

router.get("/getEventParticipants", getEventParticipants);


export default router;