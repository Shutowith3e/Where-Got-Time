import * as service from '../models/adminService.js';


const inviteGroupMembers = async (req, res) => {
		// get email and gid from req.body, admin email from req.email (from auth middleware)

        const {email_arr, gid} = req.body; 

        // if gid or email is missing 
        if (!gid || !email_arr || email_arr.length === 0) {
            return res.status(400).json({ message: "Missing gid or email array in request body" });
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
    // get gid and email rom req.body, admin's email from req.email (from auth middleware)

    const {gid, email} = req.body; 
    
    // if gid or email is missing 
    if (!gid || !email) {
        return res.status(400).json({ message: "Missing gid or member's email" });
    }

    // call model func to delete member 
    const { error } = await service.deleteGroupMember(email, gid); 
    if (error) {
        return res.status(500).json({message: "Error deleting member"});
    }

    return res.status(200).json({ message: "Member deleted successfully!" });
} //tested, works

const makeAdmin = async (req, res) => {
        // getting gid and email from fe 

        const {gid, email} = req.body; 
        
        // if gid or email is missing 
        if (!gid || !email) {
            return res.status(400).json({ message: "Missing gid or email in request body" });
        }

        // call model func to make a user admin 
        const { data,error} = await service.makeAdmin(email, gid); 
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
        // getting gid and email from fe 

        const {email, gid} = req.body; 
        
        // if gid or email is missing 
        if (!gid || !email) {
            return res.status(400).json({ message: "Missing gid or email in request body" });
        }

        // call model func to make a user admin 
        const {data, error} = await service.removeAdmin(email, gid); 
        //case 1 invalid email i.e completely wrong format not uemail
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
    const {gid, event_name, start_datetime, end_datetime, rrule, high_priority, email_arr} = req.body; 
    
    // check if everyth is entered correctly 
    if (!gid || !event_name || !start_datetime || !end_datetime || !high_priority|| email_arr.length===0) {
        return res.status(400).json({ error: "Missing details" });
    }

    const {error} = await service.createEvent(gid, event_name, start_datetime, end_datetime, rrule, high_priority,email_arr);
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
const getHighPriorityEvents = async (req, res) => {
    const {gid} = req.body;
    if(!gid){
        return res.status(400).json({error: "Missing gid"})//this should not even happen with checkadmin middleware
    }
    const{data,error} = await service.getHighPriorityEvents(gid);
    if(error){
        return res.status(500).json({message: "error fetching events",error})
    }
    return res.status(200).json({data})
} 
export {
	inviteGroupMembers,
	deleteGroup,
	deleteGroupMember,
	makeAdmin,
	removeAdmin,
	deleteEvent,
	createEvent,
	getHighPriorityEvents
}