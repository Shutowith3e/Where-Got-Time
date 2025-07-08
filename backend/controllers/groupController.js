import * as service from "../models/groupService.js";
//TODO implement functionalities for routes here
// export {fun1,fun2,etc}

const checkAdmin = async (req, res) => {
    // get gid from req.body, email from req.email (from auth middleware)
    const email = req.email;
    const { gid } = req.body;

    // if gid is missing 
    if (!gid) {
        return res.status(400).json({ message: "Missing gid in request body" });
    }
    // retrieve data from model (getAdmins func) 
    const { isAdmin, error } = await service.checkAdmin(email, gid);

    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    //return boolean value 
    return res.status(200).json({ isAdmin });
}; //tested, works. assuming gid and email is sent in by FE req body (tbc). 
// UPDATE: email shld be sent in via jwt token (not reflected in func above yet)
// UPDATE UPDATE email is now via jwt token

const createGroup = async (req, res) => {
    // get gid from req.body, email from req.email (from auth middleware)
    const email = req.email;
    const { group_name, group_description, emails_to_invite } = req.body;

    // check if all data is received 
    if (!group_name || !group_description || !emails_to_invite) {
        return res.status(400).json({ message: "Missing group name, group description, or members to invite." });
    }

    // create the grp 
    const { data, error: groupCreationError } = await service.createGroup(group_name, group_description, email, emails_to_invite); // gid and grp name returned if successful

    if (groupCreationError) {
        return res.status(500).json({ message: "Unable to create group." });
    }

    // extract grp name from data 
    const created_grpname = data.group_name;
    const created_gid = data.gid;

    //send response back to client. not sure if inclusion of GID is necessary
    return res.status(201).json({ message: `Group: "${created_grpname}" created successfully!`, gid: created_gid });
} //tested, works

const getGroupDetails = async (req, res) => {
    // get gid from FE
    const { gid } = req.body;
    // check if gid is received 
    if (!gid) {
        return res.status(400).json({ error: "Group ID (gid) is required" });
    }

    const { data, error: getNameError } = await service.getGroupDetails(gid);
    if (getNameError) {
        return res.status(500).json({ message: "Error getting group name" });
    }

    return res.status(200).json({ data });
} //tested, works

const getGroupMembers = async (req, res) => {
    // get gid from FE
    const { gid } = req.body;
    // check if gid is received 
    if (!gid) {
        return res.status(400).json({ error: "Group ID (gid) is required" });
    }

    const { data, error: getMembersError } = await service.getGroupMembers(gid);

    if (getMembersError) {
        return res.status(500).json({ message: "Could not retrieve group members" });
    }

    return res.status(200).json({ data });
} // tested, works 


const getGroupEvents = async (req, res) => {
    // get gid from FE
    const { gid } = req.body;
    // check if gid is received 
    if (!gid) {
        return res.status(400).json({ error: "Group ID (gid) is required" });
    }

    const { data, error: getEventsError } = await service.getGroupEvents(gid);
    if (getEventsError) {
        return res.status(500).json({ error: "Unable to get group's events" });
    }

    // parse data and return list of emails accordingly 
    return res.status(200).json({ data });
} //tested, works


const getAdmins = async (req, res) => {
    // getting gid from fe
    const { gid } = req.body;

    // if gid is missing 
    if (!gid) {
        return res.status(400).json({ message: "Missing gid in request body" });
    }

    const { data, error } = await service.getAdmins(gid);
    if (error) {
        res.status(500).json({ message: 'Error retrieving admins' })
    }

    return res.status(200).json({ data });

}

const acceptGroupInvite = async (req, res) => {
    // get email from auth middleware and gid from req body 
    const email = req.email;
    const { gid } = req.body;

    // check if all data is received 
    if (!gid || !email) {
        return res.status(400).json({ message: "Missing gid or email." });
    }

    // update the db to change accept boolean to true 
    const { error } = await service.acceptGroupInvite(email, gid);

    if (error) {
        return res.status(500).json({ message: "Error accepting invite" });
    }

    return res.status(200).json({ message: "You have joined the group!" });

}

const leaveGroup = async (req, res) => {
    const email = req.email;
    const { gid, personal_gid } = req.body;
    if (!gid) {
        return res.status(400).son({ message: "Missing gid" });
    }
    const { data, error } = await service.leaveGroup(email, gid, personal_gid);
    if (error) {
        return res.status(500).json({ message: "Error leaving group", error })
    }
    if (Array.isArray(data) && data.length === 0) {
        return res.status(400).json({ message: "Bad request", hint: "You either tried to leave a group you are not a part of or you tried to leave your personal calendar." })
    }
    return res.status(200).json({ message: "You have left the group!" })
}

const searchEmails = async (req, res) => {
    // GET http://localhost:8000/group/searchEmails?searchTerm=blahblahblah
    const email = req.email;
    const searchTerm = req.query.searchTerm;
    if (!searchTerm) {
        return res.status(400).json({ message: "Missing search term!" });
    }

    const { data, error } = await service.searchEmails(email, searchTerm);
    if (error) {
        res.status(500).json({ message: `Error searching for ${searchTerm}` })
    }

    return res.status(200).json(data.map(({ email }) => email));
}

const getPendingGroups = async (req, res) => {
    const email = req.email;
    
    const { data, error } = await service.getPendingGroups(email); 
    if (error){
        res.status(500).json({message: 'Error retrieving pending groups'})
    }

    return res.status(200).json(data); 
}

// export controller functions
export {
    checkAdmin,
    createGroup,
    getGroupDetails,
    getGroupMembers,
    getGroupEvents,
    getAdmins,
    acceptGroupInvite,
    searchEmails,
    leaveGroup,
    getPendingGroups
};
