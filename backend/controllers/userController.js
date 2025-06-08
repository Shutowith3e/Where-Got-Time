import * as service from "../models/userService.js";
//TODO implement functionalities for routes here
const getEmail = async (req,res) => {
	const uid = req.uid;
	const {data,error} = await service.getEmail(uid);
	if(error){
		return res.status(500).json({message:"Error retrieving email"})
	}
	return res.status(200).json({data})
}
const getGroups = async (req,res) => {
	const uid = req.uid;
	const {data,error} = await service.getEmail(uid);
	if(error){
		return res.status(500).json({message:"Error retrieving groups"})
	}
	return res.status(200).json({data})
}
const getUserEvents = async (req,res) => {
	const uid = req.uid;
	const {data,error} = await service.getEmail(uid);
	if(error){
		return res.status(500).json({message:"Error retrieving user events"})
	}
	return res.status(200).json({data})
}
export{
	getEmail,
	getGroups,
	getUserEvents
}
// export {fun1,fun2,etc}