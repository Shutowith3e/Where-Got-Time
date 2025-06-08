//file to easily test auth and connection without uid,gid,etc
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