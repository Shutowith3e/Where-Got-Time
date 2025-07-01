import supabase from "./connection.js";
import { getHighPriorityEvents } from "./adminService.js";
import pkg from 'rrule';
const { datetime, RRule, RRuleSet, rrulestr } = pkg;
import {isBefore,isAfter,isMonday,isTuesday,isWednesday,isThursday,isFriday,isSaturday,isSunday,lightFormat,getDate, getMonth} from "date-fns";

// helper to check if 2 events are clashing
const isClashDateTime = (a_start, a_end,b_start,b_end) => {
	return isAfter(a_end,b_start) && isBefore(a_start,b_end);
}

// flow:
// function to check clashes is called on update/insert/delete, call it this_event
// gets all user's high priority events, might have to expand for recurring events or have a smarter way
// compares each of them to this_event
// if any clash, add the eids to clashes 

//4 cases
//1. both event recurring
//2. this event r, the other one normal
//3. the other one recurring, this one normal
//4. both normal

//outer function: (this_event,gid)
// for each high_prio event:
// compare against this_event
// inner function: (this_event, that_event)

//recurring events have 3 types:
//1.weekly byday e.g. every monday and friday ...
//2.Monthly bymonthday e.g the 3rd of every month
//3.Annually bymonth & bymonthday

//changes the datetime to be on 2000-01-01 so pure time comparison can be done
const normaliseDateTime = (datetimestr)=>{
	return '2000-01-01T' + lightFormat(datetimestr,'HH:mm:ss');
}

const checkClash = async (this_event,gid)=>{
	if(!this_event.high_priority){
		return false;
	}
	//declare constants
	const clashesArr = [];
	const resolved = false;
	//cooking af
	const weekDayCheckMap={
		0 : isMonday,
		1 : isTuesday,
		2 : isWednesday,
		3 : isThursday,
		4 : isFriday,
		5 : isSaturday,
		6 : isSunday
	}
	
	
	//declaring this function inside to access local scope constants
	const checkSingleRecurClash = (event1,event2)=>{ // let event1 be the recurring one
		//get just the time part without the date
		const event1_startTimeStr = normaliseDateTime(event1.start_datetime);
		const event1_endTimeStr = normaliseDateTime(event1.end_datetime);
		const event2_startTimeStr = normaliseDateTime(event2.start_datetime);
		const event2_endTimeStr = normaliseDateTime(event2.end_datetime);
		const rule = new RRule.fromString(event1.rrule);

		//weekly
		if(rule.options.freq==RRule.WEEKLY){
			//check if event2 is within dtstart and until
			if(isClashDateTime(event2.start_datetime, event2.end_datetime, rule.options.dtstart, rule.options.until)){

				//check each day, rule.option.byweekday is an array of int, 0=monday, 1=tuesday...
				for(day of rule.option.byweekday){
					//checks if my event is on the same day
					if(weekDayCheckMap[day](event2)){
						if(isClashDateTime(event1_startTimeStr,event1_endTimeStr,event2_startTimeStr,event2_endTimeStr)){
							clashesArr.push({eid1,eid2,resolved});
							return //first occurance of clash, exit; only push once
						}
					}
				}
			}
		}
		//monthly
		else if (rule.option.freq==RRule.MONTHLY){
			//if event ends before first occurance, cannot be clash, skip
			if(isBefore(event2.end_datetime,rule.options.dtstart)){
				return
			}
			//if event2 happens after the last occurance of event1, skip
			if(rule.options.until && isAfter(event2.start_datetime,rule.options.until)){
				return
			}
			//if the event on same day of month, check if same time, bymonthday is an array
			if(rule.options.bymonthday.includes(getDate(event2.start_datetime))){
				if(isClashDateTime(event1_startTimeStr,event1_endTimeStr,event2_startTimeStr,event2_endTimeStr)){
					clashesArr.push({eid1,eid2,resolved});
					return
				}
			}
		}
		//annually
		else if (rule.option.freq==RRule.YEARLY){
			//if event ends before first occurance, cannot be clash, skip
			if(isBefore(event2.end_datetime,rule.options.dtstart)){
				return
			}
			//if an until exists and event2 happens after the last occurance of event1, skip
			if(rule.options.until && isAfter(rule.options.until,event2.start_datetime)){
				return
			}
			//if same month, and same day
			if(lightFormat(event2.start_datetime,'MM-dd')==lightFormat(event1.start_datetime,'MM-dd')){
				clashesArr.push({eid1,eid2,resolved})
				return
			}
		}
		//possibly add an else for error handling here if have time
	}
	///////////

	const {data:high_prio_event_arr,error:eventRetrievalError} =  await getHighPriorityEvents(gid);
	if(eventRetrievalError){
		console.warn(`Clash check failed, recheck for clash and update database, gid: ${this_event.gid} name: ${this_event.event_name}`);
		return {eventRetrievalError};
	}
	// for each high prio event
	for(other_event of high_prio_event_arr){
		//at this point this event is also inside the arr so we wna skip 
		if(other_event.eid == this_event.eid){
			continue
		}
		let eid1 = this_event.eid;
		let eid2 = other_event.eid;
		//we want the smaller eid to always be eid1
		if(eid1>eid2){
			[eid1,eid2] = [eid2,eid1];
		}
		//case 1 both not recurring
		if(!this_event.rrule&&!other_event.rrule){
			// if the two is clashing,
			if(isClashDateTime(this_event.start_datetime,this_event.end_datetime,other_event.start_datetime,other_event.end_datetime)){
				
				//put into array first, later bulk insert
				clashesArr.push({eid1,eid2,resolved})
				continue
			}
			//no clash, do nothing
		}
		//case 2 this_event is recurring, other is single
		else if(this_event.rrule && !other_event.rrule){
			checkSingleRecurClash(this_event,other_event);//has no return value, simply pushes to clashesArr if there is any

		}
		//case 3 case 2 but flipped
		else if(!this_event.rrule && other_event.rrule){
			checkSingleRecurClash(other_event,this_event);
		}

		//case 4 both recurring TODO
		else{
			//git commit sewer slide gg
		}

	}
	//this is insert+update, i.e. if there is a conflict, say a row alr exists, it will simply update the value
	//useful for say if the clash has been resolved before but someone update the event again and it clashes again
	return await supabase.from('clash').upsert(clashesArr,{onConflict:'eid1, eid2'});
	//can put a .select if need the return data for anything but i feel no need
}


// const {a_start,a_end,b_start,b_end} = {
// 	a_start:"2025-06-21T10:50:10",
// 	a_end:"2025-06-21T10:50:17",
// 	b_start:"2025-06-21T10:50:11",
// 	b_end:"2025-06-21T10:50:15"
// }


// console.log(isClashDateTime(a_start,a_end,b_start,b_end))