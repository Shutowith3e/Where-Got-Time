import supabase from "./connection.js";
// this is where all the routes that require admin access will go
const addGroupMember = async (uid, gid, is_admin) => {
	return await supabase.from('group_members').insert({uid:uid, gid:gid, is_admin:is_admin});
} //tested, works

const deleteGroup = async(gid) => {
	return await supabase.from('group').delete().eq('gid',gid);
} //tested, works 

const deleteGroupMember = async (uid, gid) =>{
	return await supabase.from('group_members').delete().match({'uid':uid, 'gid':gid});
} //tested, works

const makeAdmin = async (uid, gid) =>{
	return await supabase.from('group_members').update({is_admin:true}).match({'uid':uid, 'gid':gid});
} //tested, works

const removeAdmin = async (uid, gid) =>{
	return await supabase.from('group_members').update({is_admin:false}).match({'uid':uid, 'gid':gid});
} //tested, works

const createEvent = async (gid, event_name, start_datetime, end_datetime, rrule, high_priority) => {
	return await supabase.from('event').insert({'gid': gid, 'event_name':event_name, 'start_datetime':start_datetime, 'end_datetime':end_datetime, 'rrule':rrule, high_priority:high_priority}).select();
} //tested, works 

const deleteEvent = async (eid) => {
	return await supabase.from('event').delete().match({'eid':eid});
} //tested, works 

/////////// WIP ////////////
const getHighPriorityEvents = async(uid) => {
	return await supabase.from('event').select('eid').match({'uid':uid, high_priority:true});
} 
/////////////////////////////

export {
	addGroupMember,
	deleteGroup,
	deleteGroupMember,
	makeAdmin,
	removeAdmin,
	createEvent,
	deleteEvent,
	getHighPriorityEvents
}