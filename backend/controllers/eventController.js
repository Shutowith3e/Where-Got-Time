import * as service from "../models/eventService.js";
import { checkAdmin } from "./groupController.js";
//TODO implement functionalities for routes here


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