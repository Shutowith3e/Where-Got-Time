import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}

const getGroupName = async (gid) => {
	return await supabase.from('group').select('group_name').eq('gid',gid);
}// tested, works

const getGroupMembers = async (gid) => {
	return await supabase.from('group_members').select('uid').eq('gid',gid);
}//tested,works

const createGroup = async (group_name) => {
	return await supabase.from('group').insert({group_name:group_name}).select();// let supabase generate the uuid
}//tested, works

const getAdmins = async (gid) => {
	return await supabase.from('group_members').select('uid').match({gid:gid, is_admin:true});
}//tested, works

const getGroupEvents = async (gid) => {
	return await supabase.from('event').select("*").eq('gid',gid);
}//tested, works

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

const checkAdmin = async(uid,gid) =>{
	// will only error if invalid gid
	const {data, error} = await getAdmins(gid);
	if(!error){
	const isAdmin = data.some(admin => admin.uid === uid);
	return {isAdmin,error}
	}
	return {isAdmin:null,error};// returns null isAdmin if error js to make working with it easier
} //tested, works

/////////// WIP ////////////
const getHighPriorityEvent = async(uid) => {
	return await supabase.from('event').select('eid').match({'uid':uid, high_priority:true});
} 
/////////////////////////////

//TODO figure out how to limit certain fns to admins, fe, be or db

//below is testing script before routes

const testgid = '5c6cb264-5134-41a6-8549-46d3df1029d3';

const testuid = '244b4c5a-6578-4af9-9a87-6f4aada352ea';
//console.log(await createGroup("another random group name"));
//console.log(await removeAdmin("244b4c5a-6578-4af9-9a87-6f4aada352ea", "a359ca71-0d84-4692-abac-bd4596ac0739"));
// const {isAdmin,error} = await checkAdmin(testuid,testgid);
// console.log(isAdmin,error);
// console.log(await checkAdmin(testuid,testgid));

//export model funcs
export {
	checkAdmin,
	getGroupName,
	getGroupMembers,
	createGroup,
	getAdmins,
	getGroupEvents,
	addGroupMember,
	deleteGroup,
	deleteGroupMember,
	makeAdmin,
	removeAdmin
};