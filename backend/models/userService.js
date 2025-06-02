import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}
const getEmail = async (uid) => {
	return await supabase.from("user").select('email').eq('uid',uid);
}//tested, works

const getGroups = async (uid) => {
	return await supabase.from("group_members").select("gid").eq("uid",uid)
} // tested, works

const getUserEvents = async (uid) =>{
	return await supabase.from('event_participants').select('event(*)').eq('uid',uid);
	// returned data is an array of objects which contain event objects kinda dumb
	// but you cant handle it in here because it atually returns data, error and others, needed in controller
}//tested, works, maybe can be improved?


// below is for testing without routes, delete when done
// to run this u need a copy of the .env file in this directory
const {data,error} = await getGroups('7d118413-0d8d-43ba-822a-79187099a4c4');
//console.log(data[0].event)//this is how to get one event, may need a for loop or smth
console.log(data);
//export {func1,func2, etc}