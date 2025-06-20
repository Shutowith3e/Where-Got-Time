import * as service from '../models/adminService.js';


const inviteGroupMembers = async (req, res) => {
		// get uid and gid from req.body, admin uid from req.uid (from auth middleware)

        const {email_arr, gid} = req.body; 

        // if gid or uid is missing 
        if (!gid || !email_arr || email_arr.length === 0) {
            return res.status(400).json({ message: "Missing gid or uid array in request body" });
        }
        // take in email, fe sends emails over

        // call model func to add member 
        const { error } = await service.inviteGroupMembers(email_arr, gid); // is_admin is false by default
        if (error){
			return res.status(500).json({message:"Error inviting members. Please try again"});
		}
        return res.status(200).json({ message: "Invites sent out to members successfully!" });
} //tested, works


const deleteGroupMember = async (req, res) => {
    // get gid and uid rom req.body, admin's uid from req.uid (from auth middleware)

    const {gid, uid} = req.body; 
    
    // if gid or uid is missing 
    if (!gid || !uid) {
        return res.status(400).json({ message: "Missing gid or member's uid" });
    }

    // call model func to delete member 
    const { error } = await service.deleteGroupMember(uid, gid); 
    if (error) {
        return res.status(500).json({message: "Error deleting member"});
    }

    return res.status(200).json({ message: "Member deleted successfully!" });
} //tested, works

const makeAdmin = async (req, res) => {
        // getting gid and uid from fe 

        const {gid, uid} = req.body; 
        
        // if gid or uid is missing 
        if (!gid || !uid) {
            return res.status(400).json({ message: "Missing gid or uid in request body" });
        }

        // call model func to make a user admin 
        const { data,error} = await service.makeAdmin(uid, gid); 
        if (error){
			return res.status(500).json({message: "Error making admin"});
		}
        if(data.length == 0){
            return res.status(404).json({message: "User does not exist or is already admin"});
        }

        return res.status(200).json({ message: "Permissions for user has been changed" });
    }

 //tested, works.

const removeAdmin = async (req, res) => {
        // getting gid and uid from fe 

        const {uid, gid} = req.body; 
        
        // if gid or uid is missing 
        if (!gid || !uid) {
            return res.status(400).json({ message: "Missing gid or uid in request body" });
        }

        // call model func to make a user admin 
        const {data, error} = await service.removeAdmin(uid, gid); 
        //case 1 invalid uid i.e completely wrong format not uuid
        if (error){
			return res.status(500).json({message: "Error removing admin"});
		}
        // case 2 the person doesnt even exist or is not an admin
        if(data.length == 0){
            return res.status(404).json({message: "Admin does not exist"})
        }
        

        return res.status(200).json({ message: "Permissions for user has been removed"});
    }

//tested, works. 

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

const createEvent = async (req, res) => {
    // get details frm fe
    const {gid, event_name, start_datetime, end_datetime, rrule, high_priority} = req.body; 
    
    // check if everyth is entered correctly 
    if (!gid || !event_name || !start_datetime || !end_datetime || !high_priority) {
        return res.status(400).json({ error: "Missing details" });
    }

    const { data, error} = await service.createEvent(gid, event_name, start_datetime, end_datetime, rrule, high_priority);
    if (error){
        return res.status(500).json({message: "Error creating event"});
    }

    return res.status(201).json({message: "Event successfully created!"});
    }
// tested, works 

const deleteEvent = async (req, res) => {
        const {eid} = req.body; // either get frm fe or call anth func in be to get 

        // check if everyth is entered correctly 
        if (!eid) {
            return res.status(400).json({ error: "Missing eid" });
        }

        const { error } = await service.deleteEvent(eid); 
        if (error){
			return res.status(500).json({message: "Error deleting event"});
		}

        return res.status(200).json({message: "Event deleted successfully!"});
    }
 //tested, works

////////////// WIP /////////////////////
const getHighPriorityEvent = async (req, res) => {
    // how to get just one first ?
    // create an empty lst 
    // get all EIDs which are high priority using UID from event_part. (call model func gethpevents)
        // shove the EIDs in lst


    // input: uid. call getUserevents. 
} // this func is only written for ONE member. it shld be called repeatedly if u nid multiple members' info
////////////////////////////////////////
export {
	inviteGroupMembers,
	deleteGroup,
	deleteGroupMember,
	makeAdmin,
	removeAdmin,
	deleteEvent,
	createEvent,
	getHighPriorityEvent
}