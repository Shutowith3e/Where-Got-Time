import supabase from "./connection.js";

// all internal helper functions i.e wont have its own controllers and routes goes here
const emailToUid = async (email_arr) => {
	//returning the email as well to do some error checking
	const { data: tempData, error: selectErr } = await supabase.from('user').select('uid,email').in('email', email_arr);
	if (selectErr) {
		return { data: null, error: selectErr };
	}
	//make a set for fast lookup
	const found_emails_set = new Set(tempData.map(obj => obj.email));
	// all those emails that did not return a result will be added here
	const invalid_emails = email_arr.filter(email => !found_emails_set.has(email));
	if (invalid_emails.length > 0) {
		//if there is any invalid results, i.e not emails were passed in or user js dont exist, say which email it was, for debugging
		return { data: null, error: { message: `Invalid input or user not found`, rejected: invalid_emails } }
	}
	const uid_arr = tempData.map(obj => obj.uid);
	return { data: uid_arr, error: null }
}

const UidToEmail = async (uid_arr) => {
	//returning the uid as well to do some error checking
	const { data: tempData, error: selectErr } = await supabase.from('user').select('uid,email').in('uid', uid_arr);
	if (selectErr) {
		//interestingly if u put something that is not in uuid format it automatically throws an error, but only catches the first one
		return { data: null, error: selectErr };
	}
	//make a set for fast lookup
	const found_uid_set = new Set(tempData.map(obj => obj.uid));
	// all those emails that did not return a result will be added here
	const invalid_uids = uid_arr.filter(uid => !found_uid_set.has(uid));
	if (invalid_uids.length > 0) {
		//if there is any invalid results, i.e tampered were passed in or user js dont exist, say which uid it was, for debugging
		return { data: null, error: { message: `Invalid input or user not found`, rejected: invalid_uids } }
	}
	const email_arr = tempData.map(obj => obj.email);
	return { data: email_arr, error: null }
}


export {
	emailToUid,
	UidToEmail
}