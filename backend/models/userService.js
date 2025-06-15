import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}


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

const getGroups = async (uid) =>{
	const {data:grpData,error} = await supabase.from('group_members').select(`is_admin, group(*),user(personal_grp)`).match({"uid":uid,invite_accepted:true});
	if(error){
		return {data:null,error};
	}
	const admin_arr = [];
	const member_arr = [];
	function loader(value){ 
		if(value.is_admin && value.user.personal_grp !== value.group.gid){
			admin_arr.push(value.group);
		}
		else if(!value.is_admin && value.user.personal_grp !== value.group.gid){
			member_arr.push(value.group);
		}
	}
	grpData.forEach(loader);
	return {data:{admin_arr,member_arr},error}
}

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
	getUserPersonalGroup
}
//console.log(await supabase.from('user').select('uid').eq('email', "yongsoon.ng.2024@computing.smu.edu.sg"));
//console.log(await emailUidConverter(["05f8005d-d301-4657-8d8a-a28c7df1a582", "666bb957-0320-4f8a-9d16-cf78535bad40"]));
//console.log(await getUserPersonalGroup("666bb957-0320-4f8a-9d16-cf78535bad40"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40").neq("gid", "6faf04ff-4978-43d4-8559-59fac7a4c333"));
// console.log(await supabase.from("group_members").select("gid").eq("uid","666bb957-0320-4f8a-9d16-cf78535bad40"));
//console.log(await getGroups("244b4c5a-6578-4af9-9a87-6f4aada352ea"));
//console.log(await supabase.from('group').select().eq('gid', "1a418fb8-d234-4ef7-9a11-91f464057636"));