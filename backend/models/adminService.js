import supabase from "./connection.js";
import {checkClash} from "./clashService.js"; 

// this is where all the routes that require admin access will go
const inviteGroupMembers = async (email_arr, gid) => {
	const insertData = email_arr.map(email => ({
		email: email, 
		gid: gid,
		is_admin: false, // is_admin set to false by default
		invite_accepted: null 
	}));

	const { data , error } = await supabase.from('group_members').insert(insertData);
	if(error){
		return {error}
	};

	return {data}; 
	
} //tested, works


const deleteGroup = async(gid) => {
	return await supabase.from('group').delete().eq('gid',gid);
} //tested, works 

const deleteGroupMember = async (email, gid) =>{
	return await supabase.from('group_members').delete().match({'email':email, 'gid':gid});
} //tested, works

const makeAdmin = async (email, gid) =>{
	return await supabase.from('group_members').update({is_admin:true}).match({'email':email, 'gid':gid,'is_admin':false}).select();
} //tested, works

const removeAdmin = async (email, gid) =>{
	return await supabase.from('group_members').update({is_admin:false}).match({'email':email, 'gid':gid,'is_admin':true}).select();
} //tested, works, updated to make sure person must be admin in the first place

//nid modify to check for clashes also 
//theres upsert being done in checkClash so just call it will do 
const createEvent = async (gid, event_name, start_datetime, end_datetime, rrule, high_priority,email_arr) => {
	const {data:eventObj,error:eventCreationError} = await supabase.from('event').insert({'gid': gid, 
		'event_name':event_name, 
		'start_datetime':start_datetime, 
		'end_datetime':end_datetime, 
		'rrule':rrule, 
		high_priority:high_priority}).select(); // returns event obj 

	if(eventCreationError){
		return {error: eventCreationError};
	}
	const event = eventObj[0];
	const eid = event.eid;
	const event_gid = event.gid; 

	const insert_arr = email_arr.map(email => ({
		eid:eid ,
		email: email 
	}));

	const {data, error:participantInsertError} = await supabase.from('event_participants').insert(insert_arr);
	if(participantInsertError){
		return {error: participantInsertError}; 
	}

	return checkClash(event, event_gid); 
} // tested, works 

const updateEvent = async (eid, gid, event_name, start_datetime, end_datetime, rrule, high_priority, old_email_arr, new_email_arr) => {
	//1. nid call check clash
	//2. update event details 
	//3. insert new participants 
	//4. delete new participants 

	// for 1, call checkclash function here after calling rpc 
	// wrap 2,3,4 into 1 transaction and do rpc. 

	// postgres logic: 
		// for 2, just update by finding matching eid lor LMAO (tables to be worked on: event)
			// nid take in eid, gid, event name, startdt, enddt, high_priority, rrule 
		// for 3 and 4, do comparison btwn old and new email arr. if participant in old and not new, del. if in new and not old, insert. if in both, do nth. (tables: event_participants)
			// nid take in old and new email arrays 
	
	// update event details and participants 
	const { data: eventObj, error: eventUpdateError } = await supabase.rpc('update_event_and_participants', {p_eid: eid, 
		p_gid: gid, 
		p_event_name: event_name, 
		p_startdt: start_datetime, 
		p_enddt: end_datetime, 
		p_high_priority: high_priority, 
		p_rrule: rrule,
		p_old_emails: old_email_arr,
		p_new_emails: new_email_arr
	}); // returns the event object 

	if(eventUpdateError){
		return {eventUpdateError};
	}

	const event = eventObj[0];
	const event_gid = event.gid;

	//call checkClash func
	return checkClash(event,event_gid);
	
}

const deleteEvent = async (eid) => {
	return await supabase.from('event').delete().match({'eid':eid});
} //tested, works 

const updateGrpDetail = async(gid,new_desc,new_name)=>{
	return await supabase.from('group').update({group_description:new_desc,group_name:new_name}).eq('gid',gid)
}

const getHighPriorityEvents = async(gid) => {
	return await supabase.rpc('get_users_highprio_event_by_group',{target_group_id:gid});
} 


export {
	inviteGroupMembers,
	deleteGroup,
	deleteGroupMember,
	makeAdmin,
	removeAdmin,
	createEvent,
	deleteEvent,
	getHighPriorityEvents,
	updateGrpDetail,
	updateEvent,

}

