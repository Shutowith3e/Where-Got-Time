import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}
const getEventParticipants = async (eid) => {
	return await supabase.from('event_participants').select('uid').eq('eid',eid);
}//tested, works

//TODO figure out how to let only admins call the other functions like create,delete,update

//testing script below before implementing routing&controllers
const testeid = '0e1c9b0f-e008-4c2c-baa1-3c8145c76eb5';
console.log(await getEventParticipants(testeid));
//export {func1,func2, etc}