import * as service from '../models/adminService.js';

const addGroupMember = async (req, res) => {
		const uid = req.uid
        // getting gid and uid from fe 
        const {gid} = req.body; 
        // if gid or uid is missing 
        if (!gid || !uid) {
            return res.status(400).json({ message: "Missing gid or uid in request body" });
        }
        // call model func to add member 
        const { error } = await service.addGroupMember(uid, gid, false); // is_admin is false by default
        if (error){
			return res.status(500).json({message:"Error adding member"});
		}
        return res.status(200).json({ message: "Member added successfully!" });
} //tested, works. assuming gid and uid is sent in by FE req body (tbc). 
// UPDATE: uid shld be sent in via jwt token (not reflected in func above yet)


const deleteGroupMember = async (req, res) => {
    
        // getting gid and uid from fe 
		const uid = req.uid;
        const {gid} = req.body; 
        
        // if gid or uid is missing 
        if (!gid || !uid) {
            return res.status(400).json({ message: "Missing gid or uid in request body" });
        }

        // call model func to add member 
        const { error} = await service.deleteGroupMember(uid, gid); 
        if (error) {
			return res.status(500).json({message: "Error deleting member"});
		}

        return res.status(200).json({ message: "Member deleted successfully!" });
    

} //tested, works. assuming gid and uid is sent in by FE req body (tbc). 
// UPDATE: uid shld be sent in via jwt token (not reflected in func above yet)

const makeAdmin = async (req, res) => {
    
        // getting gid and uid from fe 
		const uid = req.uid;
        const {gid} = req.body; 
        
        // if gid or uid is missing 
        if (!gid || !uid) {
            return res.status(400).json({ message: "Missing gid or uid in request body" });
        }

        // call model func to make a user admin 
        const { error} = await service.makeAdmin(uid, gid); 
        if (error){
			return res.status(500).json({message: "Error making admin"});
		}

        return res.status(200).json({ message: "Permissions for user has been changed" });
    }

 //tested, works. assuming gid and uid is sent in by FE req body (tbc). 
// UPDATE: uid shld be sent in via jwt token (not reflected in func above yet)

const removeAdmin = async (req, res) => {
    
        // getting gid and uid from fe 
		const uid = req.uid;
        const {gid} = req.body; 
        
        // if gid or uid is missing 
        if (!gid || !uid) {
            return res.status(400).json({ message: "Missing gid or uid in request body" });
        }

        // call model func to make a user admin 
        const { error} = await service.removeAdmin(uid, gid); 
        if (error){
			return res.status(500).json({message: "Error removing admin"});
		}

        return res.status(200).json({ message: "Permissions for user has been removed" });
    }

//tested, works. assuming gid and uid is sent in by FE req body (tbc). 
// UPDATE: uid shld be sent in via jwt token (not reflected in func above yet)
const deleteGroup = async (req, res) => {
	const {gid} = req.body;
	// check if gid is received 
	if (!gid) {
		return res.status(400).json({ message: "Group ID (gid) is required" });
	}
	const {error} = await service.deleteGroup(gid);
	if (error){
		return res.status(500).json({message: "Error deleting group"})
	} 
	
	return res.status(200).json({ message: "Group deleted successfully!" });
	

} //tested, works 

export {
	addGroupMember,
	deleteGroup,
	deleteGroupMember,
	makeAdmin,
	removeAdmin}