import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}
const getEmail = async (uid) => {
	return await supabase.from("user").select('email').eq('uid',uid);
}//tested, works

const getGroups = async (uid) => {
	let processedData = null;
	const{data,error} =  await supabase.from("group_members").select("gid").eq("uid",uid)
	if(data){// if any data is returned, execute
		processedData = []
		data.forEach((value)=>{processedData.push(value.gid)});
	}
	//effectively turns it into a list of gid instead of list of objects
	return {data:processedData,error}
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
	getUserEvents
}