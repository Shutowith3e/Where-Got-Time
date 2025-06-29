import supabase from "./connection.js";

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

const createEvent = async (gid, event_name, start_datetime, end_datetime, rrule, high_priority,email_arr) => {
	const {data:eidData,error:eventCreationError} = await supabase.from('event').insert({'gid': gid, 'event_name':event_name, 'start_datetime':start_datetime, 'end_datetime':end_datetime, 'rrule':rrule, high_priority:high_priority}).select('eid');
	if(eventCreationError){
		return {eventCreationError};
	}
	const eid = eidData[0].eid;
	const insert_arr = email_arr.map(email => ({
		eid:eid ,
		email: email 
	}));
	return await supabase.from('event_participants').insert(insert_arr);
} //tested, works 

const deleteEvent = async (eid) => {
	return await supabase.from('event').delete().match({'eid':eid});
} //tested, works 

/////////// DONE ////////////
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
	getHighPriorityEvents
}

//console.log(await createEvent("5c6cb264-5134-41a6-8549-46d3df1029d3", "idw attend how", "2023-01-01T00:00:00Z","2023-01-01T00:00:00Z", null, true));
//console.log(await deleteGroupMember('244b4c5a-6578-4af9-9a87-6f4aada352ea','e0884a99-4d9a-4fa6-8fa5-eb5426804650'));
//console.log(await inviteGroupMember("244b4c5a-6578-4af9-9a87-6f4aada352ea", "62af6a4a-e77c-4124-8c13-93c08644e49a"));
//console.log(await inviteGroupMembers(["05f8005d-d301-4657-8d8a-a28c7df1a582", "244b4c5a-6578-4af9-9a87-6f4aada352ea"], "c5a45461-b148-4d04-941a-c382669b93e2"));
