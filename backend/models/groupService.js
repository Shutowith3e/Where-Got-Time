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

//TODO figure out how to limit certain fns to admins, fe, be or db

//below is testing script before routes

const testgid = '5c6cb264-5134-41a6-8549-46d3df1029d3'
console.log(await getGroupName(testgid));
//export {func1,func2, etc}