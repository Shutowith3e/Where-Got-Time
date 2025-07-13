import supabase from "./connection.js";
import { getAdmins, getGroupName } from "./groupService.js";
import { getEventName } from "./eventService.js";
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

	// check if email is an admin of that grp 
		// if admin: show arr affected + admins of other grp 
		// if participant: just show which of the user's events clash 

	// SCENARIOS: 
		// admin AND participant
		// admin and non participant 
		// member and participant 
	
		//output: data: {
			// admin_clashes: [ {event_name1, event_name2, grp_name1, grp_name2, arr_of_other_grp_admins, participants_affected }, {...} ], 
			// member_clashes: [ {event_name1, event_name2, grp_name1, grp_name2}, {...} ] 
				//}
		const clashesAdminArr = []; 
		const clashesMemberArr = [];
		

		//handles admin AND participant, member and participant 
		const{ data: clashesArr, error: clashesArrError } = await supabase.rpc('get_participant_clashes', {p_email: email});
		
		for(const eachClashPair of clashesArr){
			const eid1 = eachClashPair.eid1;
			const eid2 = eachClashPair.eid2;
			//get event names via eid
			const event_name1 = await getEventName(eid1); 
			const event_name2 = await getEventName(eid2); 
			
			const gid1 = eachClashPair.gid1; 
			const gid2 = eachClashPair.gid2; 
			// get group names via gid
			const group_name1 = await getGroupName(gid1); 
			const group_name2 = await getGroupName(gid2); 
			

			// if ur an admin AND participant of either event (handles T/T, T/F, F/T)
			if(eachClashPair.is_admin1 === true || eachClashPair.is_admin2 === true){
				let target_gid = gid1; //own gid
				let other_gid = gid2; //other grp's gid 
				
				if(eachClashPair.is_admin2 === true){
					target_gid = gid2; //own gid
					other_gid = gid1; //other grp's gid 
				}
				
				const { data: affectedMembersArr, error: affectedMemArrError } = await supabase.rpc('get_members_in_both_events', {eid1, eid2, target_gid});
				
				// get admins of other grp 
				const {data: otherAdminArr, error: getAdminError} = await getAdmins(other_gid);

				if(affectedMemArrError || getAdminError){
					return {error: affectedMemArrError || getAdminError, affectedMemArrError, getAdminError};
				}
				
				// clash pair details to be pushed into arr 
				const clash_pair = {event_name1, event_name2, group_name1, group_name2, affected_members: affectedMembersArr, other_grp_admins: otherAdminArr}; 
				// check if the pair is alr pushed anot first 
				const exists = clashesAdminArr.some(clashPair => JSON.stringify(clash_pair) === JSON.stringify(clashPair)); 
				if(!exists){
					clashesAdminArr.push({event_name1, event_name2, group_name1, group_name2, affected_members: affectedMembersArr, other_grp_admins: otherAdminArr}); 
				}
				
			}

			// if ur just a participating member in both (handles F/F)
			else{
				const clash_pair = {event_name1, event_name2, group_name1, group_name2}; 
				
				// check if the pair is alr pushed anot first 
				const exists = clashesMemberArr.some(clashPair => JSON.stringify(clash_pair) === JSON.stringify(clashPair)); 
				if(!exists){
				clashesMemberArr.push({event_name1, event_name2, group_name1, group_name2}); 
				}
			}

		}
		

		// handles admin and non participant 
		const {data: nonPartAdminArr, error: nonPartAdError} = await supabase.rpc('get_admin_clashes', {user_email: email}); 

		for(const eachPair of nonPartAdminArr){
			const eid1 = eachPair.eid1;
			const eid2 = eachPair.eid2;
			//get event names via eid
			const event_name1 = await getEventName(eid1); 
			const event_name2 = await getEventName(eid2); 
			
			const gid1 = eachPair.gid1; 
			const gid2 = eachPair.gid2; 
			// get group names via gid
			const group_name1 = await getGroupName(gid1); 
			const group_name2 = await getGroupName(gid2); 

			let target_gid = gid1; //own gid
			let other_gid = gid2; //other grp's gid 
			
			if(eachPair.is_admin2 === true){
				target_gid = gid2; //own gid
				other_gid = gid1; //other grp's gid 
			}

			// get affected members 
			const { data: affectedMembersArr, error: affectedMemArrError } = await supabase.rpc('get_members_in_both_events', {eid1, eid2, target_gid});

			// get admins of other grp 
			const {data: otherAdminArr, error: getAdminError} = await getAdmins(other_gid);

			if(affectedMemArrError || getAdminError){
				return {error: affectedMemArrError || getAdminError, affectedMemArrError, getAdminError};
			}
				
			// clash pair details to be pushed into arr 
			const clash_pair = {event_name1, event_name2, group_name1, group_name2, affected_members: affectedMembersArr, other_grp_admins: otherAdminArr}; 
			// check if the pair is alr pushed anot first 
			const exists = clashesAdminArr.some(clashPair => JSON.stringify(clash_pair) === JSON.stringify(clashPair)); 
			if(!exists){
				clashesAdminArr.push({event_name1, event_name2, group_name1, group_name2, affected_members: affectedMembersArr, other_grp_admins: otherAdminArr}); 
			}

		}

		if(clashesArrError || nonPartAdError){
				return {error: clashesArrError || nonPartAdError, clashesArrError, nonPartAdError};
		}

		return { data: {admin_clashes: clashesAdminArr, member_clashes: clashesMemberArr} }
        /////////////////// RPC ROUGH DOCUMENTATION ////////////////
	
	// 1. rpc 'get_participant_clashes': for if user is (admin AND participant)  OR (member and participant)
		// takes in email
		// returns arr of JSONS [ {eid1: xxx, gid1: xxx, is_admin1: t/f, eid2: xxx, gid2: xxx, is_admin2: t/f} ] where each JSON is a clash pair 
		// logic: 
			// make rpc which takes in eid and email and checks if user is involved in that event, returns boolean 
			// event_participants table 
		
			// check thru each row in clash table (make sure resolved is false)
			// call rpc above for each eid 
			// if rpc evals to true TWICE, affected. (if email is tagged to eid 1 + eid 2, affected )
			// from event table and group_members, add in eid, gid, and is_admin as a JSON to arr (filter by email)


	// 2. rpc 'get_members_in_both_events': gets MEMBERS affected in a particular clash
		// takes in: eid1, eid2, admin's own gid 
		// returns: list of emails (members only) that is participating in both events
			// does NOT include user herself even if she's participating (bc admin identity overrides this)
			

	// 3. rpc 'get_admin_clashes': for if user is (admin and non participant)
		// takes in email 
		// returns array of JSONs [{eid1: xxx, gid1: xxx, eid2: xxx, gid2: xxx}]
		// logic:
			//look through each row of clash table, for each eid, get gid from event table via each eid.
			// from group_members, get email using gid. invite_accepted and is_admin must be true. 
			// however, if email exists in event_participants for that eid, remove it from array 

}

// below is for testing without routes, delete when done
// to run this u need a copy of the .env file in this directory
// const {data,error} = await getUserEvents('7d118413-0d8d-43ba-822a-79187099a4c4');
//console.log(data[0].event)//this is how to get one event, may need a for loop or smth
// console.log(data);
export {
	getGroups,
	getUserEvents,
	getUserPersonalGroup,
	getUserClashes
}
//console.log(await supabase.from('user').select('uid').eq('email', "yongsoon.ng.2024@computing.smu.edu.sg"));
//console.log(await emailUidConverter(["05f8005d-d301-4657-8d8a-a28c7df1a582", "666bb957-0320-4f8a-9d16-cf78535bad40"]));
//console.log(await getUserPersonalGroup("666bb957-0320-4f8a-9d16-cf78535bad40"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40").neq("gid", "6faf04ff-4978-43d4-8559-59fac7a4c333"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40"));
//console.log(await getGroups("244b4c5a-6578-4af9-9a87-6f4aada352ea"));
//console.log(await supabase.from('group').select().eq('gid', "1a418fb8-d234-4ef7-9a11-91f464057636"));

// console.log(await getAdmins("2c8506e4-6adb-427b-be08-2efa6ecd0153"));
// console.log(await supabase.rpc('get_members_in_both_events', {eid1: '583d87b0-e8fa-475b-85cf-2399c1730e9d', eid2: '5ee7fecd-b034-4b51-b327-227ff537066a', target_gid: '2c8506e4-6adb-427b-be08-2efa6ecd0153'}));

//console.log(await getUserClashes('jiale.lim.2024@computing.smu.edu.sg'));