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

// CASE 1 SCENARIOS: 
	//1. weekly, weekly -> check if first and last occurences for both (range) overlaps, then check if fall on same days, then check time 
	//2. weekly, monthly -> check if range got overlap, then check if monthly falls on same DAY as weekly, then check time 
	//3. weekly, yearly -> check if range got overlap, then check if yearly falls on same day as weekly, then check time
	//4. monthly, monthly -> check if range got overlap, then check if they fall on same monthdays, then check time
	//5. monthly, yearly -> check if range got overlap, then check if yearly has the same monthday, then check time
	//6. yearly, yearly -> check if range got overlap, check if is same date + month, then check time 

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
				for(const day of rule.options.byweekday){
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
		else if (rule.options.freq==RRule.MONTHLY){
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
		else if (rule.options.freq==RRule.YEARLY){
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

	const checkDoubleRecurClash = (event1, event2)=>{
		// SCENARIOS: 
		const event1_startTimeStr = normaliseDateTime(event1.start_datetime);
		const event1_endTimeStr = normaliseDateTime(event1.end_datetime);
		const event2_startTimeStr = normaliseDateTime(event2.start_datetime);
		const event2_endTimeStr = normaliseDateTime(event2.end_datetime);

		let rule1 = new RRule.fromString(event1.rrule);
		let rule2 = new RRule.fromString(event2.rrule);
		//1. weekly, weekly -> check if first and last occurences for both (range) overlaps, then check if fall on same days, then check time 
		//check if they fall on same day 
		if(rule1.options.freq==RRule.WEEKLY && rule2.options.freq==RRule.WEEKLY){
			//check if it falls within same range
			if(isClashDateTime(rule1.options.dtstart, rule1.options.until, rule2.options.dtstart, rule2.options.until)){
				//get days recurred for each event respectively 
				const days1 = new Set(rule1.options.byweekday); // output shld be Set(2) {0, 2} for mon and wed
				const days2 = new Set(rule2.options.byweekday);
				
				//check if the timing got overlap
				if(isClashDateTime(event1_startTimeStr,event1_endTimeStr,event2_startTimeStr,event2_endTimeStr)){
					//check if got any overlap between the two sets (ie same days) and create a new array for all overlapping days
					const clashingDays = [...days1].filter(day => days2.has(day));
					
					if (clashingDays.length > 0) {
						clashesArr.push({eid1, eid2, resolved}); //eg [0, 1] for mon and tues
						return
					}
				}
		}
	}
		
		//2. weekly, monthly -> check if range got overlap, then check if monthly falls on same DAY as weekly, then check time 
		if((rule1.options.freq==RRule.WEEKLY && rule2.options.freq==RRule.MONTHLY) || (rule2.options.freq==RRule.WEEKLY && rule1.options.freq==RRule.MONTHLY)){
			//swap to ensure that event1 is always weekly and event2 is always monthly 
			if (rule1.options.freq === RRule.MONTHLY) {
			[rule1, rule2] = [rule2, rule1]; 
			[event1, event2] = [event2, event1]; //swap events to match
			}

			//check if it falls within same range
			if(isClashDateTime(rule1.options.dtstart, rule1.options.until, rule2.options.dtstart, rule2.options.until)){  
    			const monthlyDates = rule2.all(); //get array of datetimes of all monthly recurrences 

				// comb thru all monthly dates
				for (const date of monthlyDates) {
					for(day of rule1.option.byweekday){
						//checks if monthly event is on the same day as any of the weekly reccurences 
						if(weekDayCheckMap[day](date)){
							if(isClashDateTime(event1_startTimeStr,event1_endTimeStr,event2_startTimeStr,event2_endTimeStr)){
								clashesArr.push({eid1,eid2,resolved});
								return //first occurance of clash, exit; only push once
							}
						}
					}
				}
			}
		}
			
		//3. weekly, yearly -> check if range got overlap, then check if yearly falls on same day as weekly, then check time
		if((rule1.options.freq==RRule.WEEKLY && rule2.options.freq==RRule.YEARLY) || (rule2.options.freq==RRule.WEEKLY && rule1.options.freq==RRule.YEARLY)){
			//swap to ensure that event1 is always weekly and event2 is always yearly 
			if (rule1.options.freq === RRule.YEARLY) {
			[rule1, rule2] = [rule2, rule1]; 
			[event1, event2] = [event2, event1]; //swap events to match
			}

			//check if it falls within same range
			if(isClashDateTime(rule1.options.dtstart, rule1.options.until, rule2.options.dtstart, rule2.options.until)){  
				//check each day, rule.option.byweekday is an array of int, 0=monday, 1=tuesday...
				for(day of rule1.option.byweekday){
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

		//4. monthly, monthly -> check if range got overlap, then check if they fall on same monthday, then check time
		//5. monthly, yearly -> check if range got overlap, then check if yearly has the same monthday, then check time
		if(rule1.options.freq==RRule.MONTHLY && rule2.options.freq==RRule.MONTHLY || ((rule1.options.freq==RRule.MONTHLY && rule2.options.freq==RRule.YEARLY) || (rule2.options.freq==RRule.MONTHLY && rule1.options.freq==RRule.YEARLY))){
			//if its scenario 5, swap to ensure that event1 is always monthly and event2 is always yearly 
			if (rule1.options.freq === RRule.YEARLY) {
				[rule1, rule2] = [rule2, rule1]; 
				[event1, event2] = [event2, event1]; //swap events to match
			}

			//check if range overlaps
			if(isClashDateTime(rule1.options.dtstart, rule1.options.until, rule2.options.dtstart, rule2.options.until)){
				// check if fall on same monthday (eg 3rd of every month/year)
				const day1 = rule1.options.bymonthday?.[0]; //get monthday for event1 
				const day2 = rule2.options.bymonthday?.[0]; //get monthday for event2 
				//check if both fall on same monthdays 
				if(day1 !== undefined && day2 !== undefined && day1 === day2){
					if(isClashDateTime(event1_startTimeStr,event1_endTimeStr,event2_startTimeStr,event2_endTimeStr)){
						clashesArr.push({eid1,eid2,resolved});
						return 
					}
				}
			}
		}
		
		//6. yearly, yearly -> check if range got overlap, check if is same date + month, then check time 
		if(rule1.options.freq==RRule.YEARLY && rule2.options.freq==RRule.YEARLY){
			// check if range overlaps 
			if(isClashDateTime(rule1.options.dtstart, rule1.options.until, rule2.options.dtstart, rule2.options.until)){
				const month1 = rule1.options.bymonth?.[0]; // get month for event1 
				const month2 = rule2.options.bymonth?.[0]; // get month for event2 
				const monthDay1 = rule1.options.bymonthday?.[0]; //get monthday for event1 
				const monthDay2 = rule2.options.bymonthday?.[0]; //get monthday for event2 

				if((month1 === month2) && (monthDay1 === monthDay2)){
					if(isClashDateTime(event1_startTimeStr,event1_endTimeStr,event2_startTimeStr,event2_endTimeStr)){
						clashesArr.push({eid1,eid2,resolved});
						return 
					}
				}
			}
		}
		
	}
		

	const resolveClash = async(eid) => {
		
		// outdated supabase arr with unresolved clashes 
		const {data: dbClashArr, error} = await supabase.from('clash').select().or(`eid1.eq.${eid}, eid2.eq.${eid}`).eq('resolved', false);
		if(error){
			// stops all checks for resolved clashes immediately 
			return {error}; 
		}
		if(dbClashArr.length === 0){
			return;
		}
		for(const dbClashPair of dbClashArr){ // this whole block can be turned into an rpc on supabase if there is time to increase efficiency 
			// check if the clashpair in db exists in the clashes arr 
			const exists = clashesArr.some(clashPair => JSON.stringify(dbClashPair) === JSON.stringify(clashPair)); 
			
			if (!exists){ // if it doesnt exist means its outdated and resolved 
				let dbeid1 = dbClashPair.eid1; 
				let dbeid2 = dbClashPair.eid2; 
				//update the resolved clash to true in db 
				let {error: updateResError} = await supabase.from('clash').update({resolved: true}).match({eid1:dbeid1, eid2:dbeid2}); 
				
				if(updateResError){
					// stops all checks for resolved clashes immediately 
					return {error:updateResError}; 
				}
			}
		} 

	return; 
	} // returns nothing unless check was terminated halfway through (prev checks prior to error not affected tho), returns error 

	const {data:high_prio_event_arr,error:eventRetrievalError} =  await getHighPriorityEvents(gid);
	// console.log(high_prio_event_arr); 
	if(eventRetrievalError){
		console.warn(`Clash check failed, recheck for clash and update database, gid: ${this_event.gid} name: ${this_event.event_name}`);
		return {eventRetrievalError};
	}
	// for each high prio event
	for(const other_event of high_prio_event_arr){
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

		//case 4 both recurring 
		else{
			//git commit sewer slide gg
			checkDoubleRecurClash(this_event, other_event);
		}
	}
	//updates resolved clashes 
	resolveClash(this_event.eid);
	
	//this is insert+update, i.e. if there is a conflict, say a row alr exists, it will simply update the value
	//useful for say if the clash has been resolved before but someone update the event again and it clashes again
	return await supabase.from('clash').upsert(clashesArr,{onConflict:'eid1, eid2'});
	//can put a .select if need the return data for anything but i feel no need
}



export{checkClash,
	}; 


