import supabase from "./connection.js";
import { addGroupMember } from "./adminService.js";
// make functions to query db here
//also add functions to handle other business rules here
//eg const get users = async () => {return await supabase.from("user").select("*")}

const checkAdmin = async(uid,gid) =>{
	// will only error if invalid gid
	const {data, error} = await getAdmins(gid);
	if(!error){
		const isAdmin = data.includes(uid);
		return {isAdmin,error}
	}
	return {isAdmin:null,error};// returns null isAdmin if error js to make working with it easier
} //tested, works

const getGroupName = async (gid) => {
	const {data, error} = await supabase.from('group').select('group_name').eq('gid',gid);
	if (error){
		return {error};
	}
	// parse data and return group name accordingly 
    const group_name = data[0].group_name;
    return {data: group_name}; 
}// tested, works

const getGroupMembers = async (gid) => {
	const {data, error} = await supabase.from('group_members').select('uid').eq('gid',gid);
	
	if(error){
		return {error}; 
	}

	// parse data and return list of uids accordingly 
    let group_members = []; 
    data.forEach(loader); 

    function loader(value){ 
        group_members.push(value.uid); 
    }
	
	return {data: group_members}; 
}//tested,works

const createGroup = async (group_name, uid) => { 
	//TODO: ACCOMPLISHED
	//im thinking we import and call addGroupMember directly to add the creator 
	//UPDATE: done 

	// create group first 
	const {data: grpInfo, error: grpNameInsertError} = await supabase.from('group').insert({group_name:group_name}).select();// let supabase generate the uuid
	
	// if can create, add the creator 
	if(!grpNameInsertError){
		const created_gid = grpInfo[0].gid;
		
		// adding creator, admin by default
		const {data, error:addAdminError} = addGroupMember(uid, created_gid); 
		// if can add the creator  
		if(!addAdminError){
			return {data: grpInfo}; // returns gid and group_name to controller 
		}
		else{
			// return error
			return {addAdminError}; 
		}
	}
	else { // for if u can't create group 
		return {grpNameInsertError}; 
	}
} //tested, works 

const getAdmins = async (gid) => {
	const {data, error} = await supabase.from('group_members').select('uid').match({gid:gid, is_admin:true});

	if (error){
		return {error};
	}

	// create loader function to format data into one array
	function loader(value){ 
		admins.push(value.uid); 
	}

	 // parse data and return list of uids accordingly 
	let admins = []; 
	data.forEach(loader); 

	return {data: admins};
	
}//tested, works

const getGroupEvents = async (gid) => {
	return await supabase.from('event').select("*").eq('gid',gid);
}//tested, works








//below is testing script before routes

const testgid = '5c6cb264-5134-41a6-8549-46d3df1029d3';

const testuid = '244b4c5a-6578-4af9-9a87-6f4aada352ea';
//console.log(await createGroup("another random group name"));
//console.log(await getGroupName("53cbbfc8-cf4a-4f93-a5f5-8ae265be91d7"));
// const {isAdmin,error} = await checkAdmin(testuid,testgid);
// console.log(isAdmin,error);

//console.log(await supabase.from('group').insert({group_name:"testtestest"}).select());// let supabase generate the uuid)
//console.log(await getGroupMembers(testgid));

//console.log(await getGroupName("31e408d7-e4ab-4d77-bdd5-3c84646d0a92"));
//export model funcs
export {
	checkAdmin,
	getGroupName,
	getGroupMembers,
	createGroup,
	getAdmins,
	getGroupEvents
};

// const { data, error } = await supabase.auth.signInWithPassword({
// 	email: 'clarice.lim.2024@computing.smu.edu.sg',
// 	password: 'Password123#',
// });
// console.log(data); 