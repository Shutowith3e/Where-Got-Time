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
    // get grp name and added members from fe
    const { group_name, members } = req.body;
    // check if all data is received 
    if (!group_name || !members || !Array.isArray(members) || members.length===0) {
        return res.status(400).json({ message: "Missing group_name or members array." });
    }

    // create empty grp first 
    const { data, error: groupError } = await service.createGroup(group_name);
    if (groupError) throw groupError;
    //get auto generated gid from supabase
    const gid = data[0].gid; 

    // add members into said grp one by one 
    for(let i=0; i < members.length; i++){
        // initialise uid 
        const uid = members[i];
        
        // first member of array is alw creator, admin by default 
        let is_admin; 

        is_admin = i===0;

        // call model func to add member 
        const { error: memberError } = await service.addGroupMember(members[i], gid, is_admin);
        if (memberError) throw memberError;
    }   

    //send response back to client. not sure if inclusion of GID is necessary
    return res.status(201).json({ message: "Group created successfully!", gid: gid});
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


////////////// WIP /////////////////////
const getHighPriorityEvent = async (req, res) => {
    // how to get just one first ?
    // create an empty lst 
    // get all EIDs which are high priority using UID from event_part. (call model func gethpevents)
        // shove the EIDs in lst


    // input: uid. call getUserevents. 
} // this func is only written for ONE member. it shld be called repeatedly if u nid multiple members' info
////////////////////////////////////////

// export controller functions
export{
    checkAdmin, 
    createGroup,
    getGroupName,
    getGroupMembers,
    getGroupEvents,
    getAdmins
};
