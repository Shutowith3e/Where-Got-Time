import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}

const emailUidConverter = async (user_info_arr) => { // takes in a string of either UID or email 
	const converted_arr = user_info_arr.map(async (user_info) => {
		if(user_info.includes("@")){ // checks for @ symbol to determine if it's email 
			const {data, error} = await supabase.from('user').select('uid').eq('email', user_info); 
			
			if(!error){
				const uid = data[0].uid
				return uid
			}
		}

		else{
			// if it's UID it returns email 
			const {data, error} = await supabase.from('user').select('email').eq('uid', user_info);
			
			if(!error){
				const email = data[0].email
				return email
			}
		}

		return {error}
	})

	return Promise.all(converted_arr);
	
} //tested, works 


const getEmail = async (uid) => {
	return await supabase.from("user").select('email').eq('uid',uid);
}//tested, works

const getUserPersonalGroup = async (uid) => {
	const { data, error } = await supabase.from('user').select('personal_grp').eq('uid',uid); 
	if(!error){
		const personal_gid = data[0].personal_grp;
		return {data: personal_gid}
	}
	return {error}
}

const getGroups = async (uid) => {
	//get personal gid of user 
	const { data: personal_gid } = await getUserPersonalGroup(uid); 

	//exclude personal gid frm groups returned
	// get an arr for GIDs which user is admin, another arr for user is NOT admin 
	const{data:admin_arr ,error: adminArrError} =  await supabase.from("group_members").select("gid").match({"uid":uid, is_admin:true}).neq("gid", personal_gid);
	const{data:member_arr ,error: memberArrError} =  await supabase.from("group_members").select("gid").match({"uid":uid, is_admin:false}).neq("gid", personal_gid);

	// if any one cannot return, whole thing will return error
	if (!admin_arr || !member_arr) {
		return { data: null, error }
	};

	if(admin_arr && member_arr){// if all data is returned, execute
		const final_admin_arr = await Promise.all(
			admin_arr.map(async (value)=>{
				const {data: grpInfo , error: grpError} = await supabase.from('group').select().eq('gid', value.gid);
				
				if (grpError){
					return {grpError};
				}

				// retrieve the data from each object in the array returned by grpInfo query 
				const gid = grpInfo[0].gid;
				const group_name = grpInfo[0].group_name;
				const group_description = grpInfo[0].group_description;

				// store the group details in a JSON
				return {gid, group_name, group_description}
			})
		);

		// rinse and repeat for member array 
		const final_member_arr = await Promise.all(
			member_arr.map(async (value)=>{
				const {data: grpInfo , error: grpError} = await supabase.from('group').select().eq('gid', value.gid);
				if (grpError){
					return {grpError};
				}
				const gid = grpInfo[0].gid;
				const group_name = grpInfo[0].group_name;
				const group_description = grpInfo[0].group_description;
				return {gid, group_name, group_description}
			})
		);

		return {final_admin_arr, final_member_arr}
	}	
} // tested, works

const getUserEvents = async (uid) =>{
	let processedData = null;
	const{data,error} = await supabase.from('event_participants').select('event(*)').eq('uid',uid);
	if(data){// if any data is returned, execute, else, data is null
		processedData = []
		data.forEach((value)=>{processedData.push(value.event)});
	}
	//effectively turns it into a list of event objects instead of list of objects of event objects
	return {data:processedData,error}
}//tested, works, maybe can be improved?


// below is for testing without routes, delete when done
// to run this u need a copy of the .env file in this directory
// const {data,error} = await getUserEvents('7d118413-0d8d-43ba-822a-79187099a4c4');
//console.log(data[0].event)//this is how to get one event, may need a for loop or smth
// console.log(data);
export {
	getEmail,
	getGroups,
	getUserEvents,
	emailUidConverter,
	getUserPersonalGroup
}
//console.log(await supabase.from('user').select('uid').eq('email', "yongsoon.ng.2024@computing.smu.edu.sg"));
//console.log(await emailUidConverter(["05f8005d-d301-4657-8d8a-a28c7df1a582", "666bb957-0320-4f8a-9d16-cf78535bad40"]));
//console.log(await getUserPersonalGroup("666bb957-0320-4f8a-9d16-cf78535bad40"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40").neq("gid", "6faf04ff-4978-43d4-8559-59fac7a4c333"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40"));
//console.log(await getGroups("244b4c5a-6578-4af9-9a87-6f4aada352ea"));
//console.log(await supabase.from('group').select().eq('gid', "1a418fb8-d234-4ef7-9a11-91f464057636"));