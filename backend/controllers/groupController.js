import * as service from "../models/groupService.js";
//TODO implement functionalities for routes here
// export {fun1,fun2,etc}

const checkAdmin = async (req, res) => {
    // get gid from req.body, uid from req.uid (from auth middleware)
	const uid = req.uid;
    const {gid} = req.body;
    
    // if gid is missing 
    if (!gid) {
        return res.status(400).json({ message: "Missing gid in request body" });
    }
    // retrieve data from model (getAdmins func) 
    const {isAdmin, error} = await service.checkAdmin(uid,gid);
    
    if (error){
        return res.status(400).json({ message: "Bad Request", error });
    }
    //return boolean value 
    return res.status(200).json({ isAdmin });
}; //tested, works. assuming gid and uid is sent in by FE req body (tbc). 
// UPDATE: uid shld be sent in via jwt token (not reflected in func above yet)
// UPDATE UPDATE uid is now via jwt token

const createGroup = async (req, res) => {
    // get gid from req.body, uid from req.uid (from auth middleware)
    const uid = req.uid; 
    const { group_name } = req.body;

    // check if all data is received 
    if (!group_name || !uid) {
        return res.status(400).json({ message: "Missing group name or uid." });
    }
    
    // create the grp 
    const { data, error: groupCreationError } = await service.createGroup(group_name, uid); // gid and grp name returned if successful
    
    if (groupCreationError){
        return res.status(500).json({ message: "Unable to create group."}); 
    }
    
    // extract grp name from data 
    const created_grpname = data[0].group_name; 
    const created_gid = data[0].gid; 

    //send response back to client. not sure if inclusion of GID is necessary
    return res.status(201).json({ message: `Group: "${created_grpname}" created successfully!`, gid: created_gid});
} //tested, works



const getGroupName = async (req, res) => {
    // get gid from FE
    const {gid} = req.body; 
    // check if gid is received 
    if (!gid) {
        return res.status(400).json({ error: "Group ID (gid) is required" });
    }

    const {data, error: getNameError} = await service.getGroupName(gid);
    if (getNameError) throw getNameError;

    // parse data and return group name accordingly 
    const group_name = data[0].group_name;
    return res.status(200).json({group_name: group_name}); 
} //tested, works

const getGroupMembers = async (req, res) => {
    // get gid from FE
    const {gid} = req.body; 
    // check if gid is received 
    if (!gid) {
        return res.status(400).json({ error: "Group ID (gid) is required" });
    }

    const {data, error: getMembersError} = await service.getGroupMembers(gid);
    if (getMembersError) throw getMembersError;

    // parse data and return list of uids accordingly 
    let grp_members = []; 
    data.forEach(loader); 

    function loader(value){ 
        grp_members.push(value.uid); 
    }
    
    return res.status(200).json({grp_members}); 
} //tested, works

const getGroupEvents = async (req, res) => {
    // get gid from FE
    const {gid} = req.body; 
    // check if gid is received 
    if (!gid) {
        return res.status(400).json({ error: "Group ID (gid) is required" });
    }

    const {data, error: getEventsError} = await service.getGroupEvents(gid);
    if (getEventsError) throw getEventsError;

    // parse data and return list of uids accordingly 
    return res.status(200).json({data}); 
} //tested, works




const getAdmins = async (req, res) => {
    // getting gid from fe
    const {gid} = req.body;

    // if gid is missing 
    if (!gid) {
        return res.status(400).json({ message: "Missing gid in request body" });
    }

    const { data, error } = await service.getAdmins(gid); 
    if (error){
		res.status(500).json({message:'Error retrieving admins'})
	}

    // parse data and return list of uids accordingly 
    let admins = []; 
    data.forEach(loader); 

    function loader(value){ 
        admins.push(value.uid); 
    }
    
    return res.status(200).json({admins}); 

}


// export controller functions
export{
    checkAdmin, 
    createGroup,
    getGroupName,
    getGroupMembers,
    getGroupEvents,
    getAdmins
};
