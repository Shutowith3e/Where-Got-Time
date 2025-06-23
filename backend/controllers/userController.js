import * as service from "../models/userService.js";
//TODO implement functionalities for routes here


const getUserPersonalGroup = async (req, res) => {
	//get email from jwt 
	const email = req.email;
	const { data, error } = await service.getUserPersonalGroup(email); 
	if(error){
		return res.status(500).json({message: "Error retrieving personal gid"})
	}
	return res.status(200).json({data})
}

const getGroups = async (req,res) => {
	const email = req.email;
	const {data,error} = await service.getGroups(email);
	if(error){
		return res.status(500).json({message:"Error retrieving groups"})
	}
	return res.status(200).json({data})
}
const getUserEvents = async (req,res) => {
	const email = req.email;
	const {data,error} = await service.getUserEvents(email);
	if(error){
		return res.status(500).json({message:"Error retrieving user events"})
	}
	return res.status(200).json({data})
}
export{

	getGroups,
	getUserEvents,
	getUserPersonalGroup
}
// export {fun1,fun2,etc}