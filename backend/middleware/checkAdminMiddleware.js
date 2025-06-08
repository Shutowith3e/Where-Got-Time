import { checkAdmin } from "../models/groupService.js";
const mCheckAdmin = async (req,res,next) =>{
	const uid = req.uid;
	const {gid} = req.body;
	const {isAdmin,error} = await checkAdmin(uid,gid);
	if(error){
		return res.status(400).json({message:"Bad Request",error });
	}
	if(!isAdmin){
		return res.status(403).json({message:"Only group admins can use this method"});
	}
	next();
}
export default mCheckAdmin;