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

const getEventName = async (eid) => {
	const {data, error} = await supabase.from('event').select('event_name').eq('eid',eid); 

	if(error){
		return {error};
	}

	return data[0].event_name; 
}


//export {func1,func2, etc}
export{
	getEventParticipants,
	getEventName
}