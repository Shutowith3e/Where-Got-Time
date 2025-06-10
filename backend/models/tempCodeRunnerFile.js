const createGroup = async (group_name) => {}
// 	//TODO
// 	//im thinking we import and call addGroupMember directly to add the creator 
// 	// get grp name and added members from fe
//     const { group_name, members } = req.body;
//     // check if all data is received 
//     if (!group_name || !members || !Array.isArray(members) || members.length===0) {
//         return res.status(400).json({ message: "Missing group_name or members array." });
//     }

// 	const {data: gid, error: grpNameInsertError} = await supabase.from('group').insert({group_name:group_name}).select();// let supabase generate the uuid
	
// 	// adding creator, admin by default
// 	const {data: add, error} = addGroupMember(uid, gid, true); 
// }