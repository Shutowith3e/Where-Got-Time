//file to easily test auth and connection without uid,gid,etc
//import * as service from '../models/adminService.js';
import supabase from "./models/connection.js";
import express from "express";
const router = express.Router();
const getAllUsers = async (req, res) => {

    // Fetch all tasks from the database using supabase
    const { data, error } = await supabase.from("user").select('*');
    // const error = false;
    if (error) {
        // Send a 500 status code if response is not successful from supabase with message
        return res.status(500).json({ message: "Error ", error });
    }
    // Return the tasks to the client with a 200 status code
    return res.status(200).json(data);
};
router.get('/getAllUsers',getAllUsers);
export default router;

//console.log(await service.inviteGroupMember("244b4c5a-6578-4af9-9a87-6f4aada352ea", "1a418fb8-d234-4ef7-9a11-91f464057636"));
// const { data, error } = await supabase.auth.signInWithPassword({
// 	email: 'clarice.lim.2024@computing.smu.edu.sg',
// 	password: 'Password123#',
// });
// console.log(data); 