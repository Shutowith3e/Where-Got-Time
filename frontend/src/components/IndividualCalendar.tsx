import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";

// import { GetUserEvents } from '@/services/events/get-user-events-data2';
const headerToolbar = {
  start: "",
  center: "title",
  right: "today timeGridWeek,dayGridMonth prev,next",
};
// const event2=  [{
// 		"eid": "68f9d513-9d12-4f9d-9b95-acc799d6f103",
// 		"gid": "21924b54-03cd-40bb-92b6-fac4a0d68e6f",
// 		"group": {
//       "group_name":'lol'
//     },
// 		"rrule": 'DTSTART:20250627T144700\nRRULE:FREQ=WEEKLY;BYDAY=FR;UNTIL=20260627',
// 		"eventName": "simi event bro",
// 		"startDatetime": "2025-06-27T14:47:00",
// 		"endDatetime": "2025-06-27T15:47:00",
// 		"highPriority": true
// 		}]
// const events = await GetUserEvents();
// console.log(events);

const IndividualCalendar = ({ fetchEvents = () => {} }: any) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    loadEvents();
  }, [fetchEvents]);

  const dataTransformer = (eventData: any) => {
    return {
      id: eventData.eid,
      title: eventData.eventName,
      start: eventData.startDatetime.toISOString(),
      end: eventData.endDatetime.toISOString(),
      rrule: eventData.rrule ? eventData.rrule : null,
      duration: {
        seconds: eventData.duration,
      },
      extendedProps: {
        high_priority: eventData.highPriority,
        group_name: eventData.groupName ?? null,
      },
    };
  };

  return (
    <div className="mb-6 h-128 w-full rounded-lg bg-white shadow">
      <p className="flex-grow h-full items-center justify-center font-bold text-gray-400">
        <FullCalendar
          plugins={[
            timeGridPlugin,
            dayGridPlugin,
            interactionPlugin,
            rrulePlugin,
          ]}
          initialView="timeGridWeek"
          height={"100%"}
          expandRows={true}
          allDaySlot={false}
          headerToolbar={headerToolbar}
          events={events}
          eventDataTransform={dataTransformer}
        />
      </p>
    </div>
  );
};
export default IndividualCalendar;
