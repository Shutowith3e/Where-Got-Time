import supabase from "./connection.js";
import pkg from 'rrule';
const { datetime, RRule, RRuleSet, rrulestr } = pkg;
import {isBefore,isAfter} from "date-fns";

// helper to check if 2 events are clashing
const isClashTime = (a_start, a_end,b_start,b_end) => {
	return isAfter(a_end,b_start) && isBefore(a_start,b_end);
}

// flow:
// function to check clashes is called on update/insert/delete, call it this_event
// gets all user's high priority events, might have to expand for recurring events or have a smarter way
// compares each of them to this_event
// if any clash, add the eid, gid, array(?) of affected students' emails to a row 





// const {a_start,a_end,b_start,b_end} = {
// 	a_start:"2025-06-21T10:50:10",
// 	a_end:"2025-06-21T10:50:17",
// 	b_start:"2025-06-21T10:50:11",
// 	b_end:"2025-06-21T10:50:15"
// }


console.log(isClashTime(a_start,a_end,b_start,b_end))