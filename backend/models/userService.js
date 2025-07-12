import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}




const getUserPersonalGroup = async (email) => {
	const { data, error } = await supabase.from('user').select('personal_grp').eq('email', email);
	if (!error) {
		const personal_gid = data[0].personal_grp;
		return { data: personal_gid }
	}
	return { error }
}

const getGroups = async (email) => {
	const { data: grpData, error } = await supabase.from('group_members').select(`is_admin, group(*),user(personal_grp)`).match({ "email": email, invite_accepted: true });
	if (error) {
		return { data: null, error };
	}
	const admin_arr = [];
	const member_arr = [];
	function loader(value) {
		if (value.is_admin && value.user.personal_grp !== value.group.gid) {
			admin_arr.push(value.group);
		}
		else if (!value.is_admin && value.user.personal_grp !== value.group.gid) {
			member_arr.push(value.group);
		}
	}
	grpData.forEach(loader);
	return { data: { admin_arr, member_arr }, error }
}

const getUserEvents = async (email) => {
	let processedData = null;
	const { data, error } = await supabase.from('event_participants').select('event(*, group(*))').eq('email', email);
	if (data) {// if any data is returned, execute, else, data is null
		processedData = []
		data.forEach((value) => { processedData.push(value.event) });
	}
	//effectively turns it into a list of event objects instead of list of objects of event objects
	return { data: processedData, error }
}//tested, works, maybe can be improved?

const getUserClashes = async (email) => {
	// take in user email thru jwt to check for clashes 

	// admin AND participant
	// admin and non participant 
	// member and participant 

	// wanna get: 
		//1. event name 1
		//2. event name 2
		//3. grp name 1
		//4. grp name 2
		//5. arr of emails of other event's admins + participants in event affected (ownside overlap)

	// for 5, helper func (do on supabase rpc)
	// call rpc twice 
	
	// check if email is in participant arr or admin arr
		
	
	// rpc logic: 
		// takes in email
		// returns arr of JSONS [ {eid1: xxx, gid1: xxx, is_admin1: t/f, eid2: xxx, gid2: xxx, is_admin2: t/f} ]
		
		// check thru each row in clash table 
		// if email is tagged to eid 1 + eid 2 (check gid), affected 
			// join clash with event via eids. get gids
			// join grp members via gids 
			// get gid and is_admin 
			// filter by email 
		
	// call check admin func to check if email is an admin of that grp 
		// if admin: show arr affected + admins of other grp 
			// rpc 2 logic
			// call get admins func for other grp (feed in gid of other grp)
		// if participant: just show which of the user's events clash 

	// rpc 'get_members_in_both_events' logic: (for if user is admin of that gid and uw show affected)
		// take in eid1, eid2, admin's own gid 
		// returns list of emails (members only) that is participating in both events
		// includes user herself if she's participating 
	const { data: affectedMemberArr, error } = await supabase.rpc('get_members_in_both_events', {eid1: '583d87b0-e8fa-475b-85cf-2399c1730e9d', eid2: '5ee7fecd-b034-4b51-b327-227ff537066a', target_gid: '2c8506e4-6adb-427b-be08-2efa6ecd0153'});
	// ^^ this returns {...data: ['xxx', 'xxx'], }

	// get event name for both eid1 and eid2 (create another endpoint to get event name by eid) 
	// get grp name for both gid1 and gid2 
	


}

// below is for testing without routes, delete when done
// to run this u need a copy of the .env file in this directory
// const {data,error} = await getUserEvents('7d118413-0d8d-43ba-822a-79187099a4c4');
//console.log(data[0].event)//this is how to get one event, may need a for loop or smth
// console.log(data);
export {
	getGroups,
	getUserEvents,
	getUserPersonalGroup
}
//console.log(await supabase.from('user').select('uid').eq('email', "yongsoon.ng.2024@computing.smu.edu.sg"));
//console.log(await emailUidConverter(["05f8005d-d301-4657-8d8a-a28c7df1a582", "666bb957-0320-4f8a-9d16-cf78535bad40"]));
//console.log(await getUserPersonalGroup("666bb957-0320-4f8a-9d16-cf78535bad40"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40").neq("gid", "6faf04ff-4978-43d4-8559-59fac7a4c333"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40"));
//console.log(await getGroups("244b4c5a-6578-4af9-9a87-6f4aada352ea"));
//console.log(await supabase.from('group').select().eq('gid', "1a418fb8-d234-4ef7-9a11-91f464057636"));

console.log(await supabase.rpc('get_members_in_both_events', {eid1: '583d87b0-e8fa-475b-85cf-2399c1730e9d', eid2: '5ee7fecd-b034-4b51-b327-227ff537066a', target_gid: '2c8506e4-6adb-427b-be08-2efa6ecd0153'}));