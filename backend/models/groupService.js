import supabase from "./connection.js";
import { inviteGroupMembers } from "./adminService.js";
import { emailToUid, UidToEmail } from "./helper.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}

const checkAdmin = async (uid, gid) => {
	// will only error if invalid gid
	const { data, error } = await getAdmins(gid);
	if (!error) {
		const isAdmin = data.includes(uid);
		return { isAdmin, error }
	}
	return { isAdmin: null, error };// returns null isAdmin if error js to make working with it easier
} //tested, works

const getGroupDetails = async (gid) => {
	return await supabase.from('group').select(`group_name, group_description`).eq('gid', gid);
}// tested, works

const getGroupMembers = async (gid) => {
	const { data, error } = await supabase.from('group_members').select('uid').match({ 'gid': gid, 'invite_accepted': true });

	if (error) {
		return { error };
	}

	// parse data and return list of uids accordingly 
	let group_members = [];
	data.forEach(loader);

	function loader(value) {
		group_members.push(value.uid);
	}

	return { data: group_members };
}// tested, works

const getGroupMembersEmails = async (gid) => {
	const { data, error } = await getGroupMembers(gid);

	if (!error) {
		return await UidToEmail(data);
	}
	return { error };
} // tested, works

const createGroup = async (group_name, group_description, uid, emails_to_invite) => {
	// create group first 
	const { data: grpInfo, error: grpNameInsertError } = await supabase.from('group').insert({ group_name: group_name, group_description: group_description }).select();// let supabase generate the uuid
	if (grpNameInsertError) {// for if u can't create group 
		return { error: grpNameInsertError };
	}
	// if can create, add the creator 
	// group's auto gen GID
	const created_gid = grpInfo[0].gid;
	// adding creator, admin by default
	const { data, error: addCreatorError } = await supabase.from('group_members').insert({ uid: uid, gid: created_gid, invite_accepted: true }) //auto sets invite accepted to true for creator
	// if can add the creator  
	if (addCreatorError) {
		return { error: addCreatorError };
	}
	// convert emails to UIDs
	const { data: uids_to_invite, error: conversionError } = await emailToUid(emails_to_invite);
	if (conversionError) {
		return { error: conversionError };
	}
	// invite all members 
	const { error } = await inviteGroupMembers(uids_to_invite, created_gid);
	if (!error) {
		return { data: grpInfo, message: "Members invited successfully" }; // returns gid and group_name to controller 
	}
	return { data: grpInfo, error };
}


//tested, works 

const getAdmins = async (gid) => {
	const { data, error } = await supabase.from('group_members').select('uid,user(email)').match({ gid: gid, is_admin: true });

	if (error) {
		return { error };
	}
	const admin_emails = data.map(obj => obj.user.email)

	return { data: admin_emails, error };

}//tested, works

const getGroupEvents = async (gid) => {
	return await supabase.from('event').select("*").eq('gid', gid);
}//tested, works

const acceptGroupInvite = async (uid, gid) => {
	return await supabase.from('group_members').update({ invite_accepted: true }).match({ uid: uid, gid: gid });
} // tested, works 

const searchEmails = async (searchTerm) => {
	return await supabase.from('user').select('email').like('email', `%${searchTerm}%`).limit(10);
}




//console.log(await acceptGroupInvite("244b4c5a-6578-4af9-9a87-6f4aada352ea", "74cf7e70-1c97-405e-9957-0858f3968176"));

//below is testing script before routes

const testgid = '5c6cb264-5134-41a6-8549-46d3df1029d3';

const testuid = '244b4c5a-6578-4af9-9a87-6f4aada352ea';
//console.log(await createGroup("dessert you", [""]));
//console.log(await getGroupName("1734e999-dfb5-4ff3-a6b3-b350b750f76b"));
// const {isAdmin,error} = await checkAdmin(testuid,testgid);
// console.log(isAdmin,error);

//console.log(await supabase.from('group').insert({group_name:"testtestest"}).select());// let supabase generate the uuid)
//console.log(await getGroupMembers(testgid));

//console.log(await getAdmins("1a418fb8-d234-4ef7-9a11-91f464057636"));
//export model funcs
//console.log(await getGroupMembers("74cf7e70-1c97-405e-9957-0858f3968176"));
//console.log(await getGroupMembersEmails("74cf7e70-1c97-405e-9957-0858f3968176"));
export {
	checkAdmin,
	getGroupDetails,
	getGroupMembers,
	createGroup,
	getAdmins,
	getGroupEvents,
	acceptGroupInvite,
	getGroupMembersEmails,
	searchEmails,
};

// const { data, error } = await supabase.auth.signInWithPassword({
// 	email: 'clarice.lim.2024@computing.smu.edu.sg',
// 	password: 'Password123#',
// });
// console.log(data); 

