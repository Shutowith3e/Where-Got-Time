import * as service from "../models/eventService.js";
import { checkAdmin } from "./groupController.js";
//TODO implement functionalities for routes here
const createEvent = async (req, res) => {
    const isAdmin = true //temp place holder. to be replaced w checkAdmin 

    if(isAdmin){
        // get details frm fe
        const {gid, event_name, start_datetime, end_datetime, rrule, high_priority} = req.body; 
        
        // check if everyth is entered correctly 
        if (!gid || !event_name || !start_datetime || !end_datetime || !high_priority) {
            return res.status(400).json({ error: "Missing details" });
        }

        const { data, error: createEventError} = await service.createEvent(gid, event_name, start_datetime, end_datetime, rrule, high_priority);
        if (createEventError) throw createEventError;

        return res.status(201).json({message: "Event successfully created!"});
    }

    return res.status(401).json({ message: "Unauthorized: Only admins can create events."});
} // tested, works 

const deleteEvent = async (req, res) => {
    const isAdmin = true //temp place holder. to be replaced w checkAdmin 

    if(isAdmin){
        const {eid} = req.body; // either get frm fe or call anth func in be to get 

        // check if everyth is entered correctly 
        if (!eid) {
            return res.status(400).json({ error: "Missing eid" });
        }

        const { error: deleteEventError } = await service.deleteEvent(eid); 
        if (deleteEventError) throw deleteEventError;

        return res.status(200).json({message: "Event deleted successfully!"});
    }
    return res.status(401).json({ message: "Unauthorized: Only admins can delete events."});
} //tested, works

const getEventParticipants = async (req, res) => {
    const {eid} = req.body; // either get frm fe or call anth func in be to get 

    // check if everyth is entered correctly 
    if (!eid) {
        return res.status(400).json({ error: "Missing eid" });
    }

    const { data, error: getParticipantError } = await service.getEventParticipants(eid); 
    if (getParticipantError) throw getParticipantError;

    // parse data and return list of uids accordingly 
    let participants = []; 
    data.forEach(loader); 

    function loader(value){ 
        participants.push(value.uid); 
    }

    return res.status(200).json({participants});

} //tested, works

// export {fun1,fun2,etc}
export{
    createEvent,
    deleteEvent,
    getEventParticipants
}