import * as service from "../models/groupService.js";
//TODO implement functionalities for routes here
// export {fun1,fun2,etc}

const checkAdmin = async (req, res) => {
    // getting gid and uid from fe 
    const {gid, uid} = req.body;
    
    // if gid or uid is missing 
    if (!gid || !uid) {
        return res.status(400).json({ message: "Missing gid or uid in request body" });
    }

    // retrieve data from model (getAdmins func) 
    const {data, error} = await service.getAdmins(gid);
    
    if (error){
        return res.status(500).json({ message: "Server Error", error });
    }
    //check if uid given is an admin of gid given 
    const isAdmin = data.some(admin => admin.uid === uid);
    //return boolean value 
    return res.status(200).json({ isAdmin });
}; 

// export controller functions
export{checkAdmin};
