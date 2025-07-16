import supabase from "./connection.js";

// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}

const checkAdmin = async (email, gid) => {
	// will only error if invalid gid
	const { data, error } = await getAdmins(gid);
	if (!error) {
		const isAdmin = data.includes(email);
		return { isAdmin, error }
	}
	return { isAdmin: null, error };// returns null isAdmin if error js to make working with it easier
} //tested, works

const getGroupDetails = async (gid) => {
	const {data,error} =  await supabase.from('group').select(`group_name, group_description`).eq('gid', gid);
	if(error){
		return {error};
	}
	return {data:data[0]};
}// tested, works

const getGroupName = async (gid) => {
	const {data,error} =  await supabase.from('group').select(`group_name`).eq('gid', gid);
	if(error){
		return {error};
	}
	return data[0].group_name;
}

const getGroupMembers = async (gid) => {
	const { data, error } = await supabase.from('group_members').select('email').match({ 'gid': gid, 'invite_accepted': true });

	if (error) {
		return { error };
	}

	// parse data and return list of emails accordingly 
	let group_members = [];
	data.forEach(loader);

	function loader(value) {
		group_members.push(value.email);
	}

	return { data: group_members };
}// tested, works



const createGroup = async (group_name, group_description, creator_email, emails_to_invite) => {
	return await supabase.rpc('create_group_and_invite',{group_name_inp:group_name, group_description_inp:group_description, creator_email, emails_to_invite});
} // returns gid, group_name in data when success


//tested, works 

const getAdmins = async (gid) => {
	const {data, error} =  await supabase.from('group_members').select('email').match({ gid: gid, is_admin: true });
	if(error){
		return {error};
	}
	const admins = [];
	data.forEach(loader)
	function loader(value){
		admins.push(value.email)
	}
	return {data:admins};

}//tested, works

const getGroupEvents = async (gid) => {
	return await supabase.from('event').select("*").eq('gid', gid);
}//tested, works

const acceptGroupInvite = async (email, gid) => {
	return await supabase.from('group_members').update({ invite_accepted: true }).match({ email: email, gid: gid });
} // tested, works 

const rejectGroupInvite = async (email, gid) => {
	return await supabase.from('group_members').update({invite_accepted: false}).match({email, gid}).is('invite_accepted', null);
} // tested, works

const leaveGroup = async (email,gid,personal_gid)=>{
	return await supabase.from('group_members').delete().match({email:email,gid:gid}).neq('gid',personal_gid).select();
}//returns data if u left the grp, returns nthg if u didnt

const searchEmails = async (email,searchTerm) => {
	return await supabase.from('user').select('email').neq('email',email).like('email', `%${searchTerm}%`).limit(10);
}

const getPendingGroups = async (email_inp)=>{
	const { data, error } = await supabase.rpc('get_pending_group_invites', {email: email_inp});
	
	if(error){
		return {error};
	}
	return {data};
}
// tested, works 



export {
	checkAdmin,
	getGroupDetails,
	getGroupMembers,
	createGroup,
	getAdmins,
	getGroupEvents,
	acceptGroupInvite,
	searchEmails,
	leaveGroup,
	getPendingGroups,
	rejectGroupInvite,
	getGroupName
};


