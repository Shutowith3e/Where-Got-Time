import supabase from "./connection.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}
const getEventParticipants = async (eid) => {
	const { data, error } = await supabase.from('event_participants').select('email').eq('eid',eid);
	
	if(error){
		return {error};
	}

	//loader function for formatting data into an array 
	function loader(value){ 
		participants.push(value.email); 
	}

	// parse data and return list of emails accordingly 
	let participants = []; 
	data.forEach(loader); 

	return {data: participants};

}//tested, works



// TODO make a func to get eid by gid? 

//testing script below before implementing routing&controllers
const testeid = '0e1c9b0f-e008-4c2c-baa1-3c8145c76eb5';
//console.log(await getEventParticipants(testeid));
//export {func1,func2, etc}
export{
	getEventParticipants,
}