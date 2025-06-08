import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}
const getEventParticipants = async (eid) => {
	return await supabase.from('event_participants').select('uid').eq('eid',eid);
}//tested, works



// TODO make a func to get eid by gid? 

//testing script below before implementing routing&controllers
const testeid = '0e1c9b0f-e008-4c2c-baa1-3c8145c76eb5';
//console.log(await createEvent("5c6cb264-5134-41a6-8549-46d3df1029d3", "hohoho event", '2023-01-01T00:00:00Z', '2023-01-01T00:00:00Z', null, true));

//export {func1,func2, etc}
export{
	getEventParticipants,

}