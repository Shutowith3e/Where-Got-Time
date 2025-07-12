import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import dayjs from "dayjs";

// import { GetUserEvents } from '@/services/events/get-user-events-data2';
const headerToolbar = {
  start: "prev,today,next",
  center: "title",
  right: "timeGridDay,timeGridWeek,dayGridMonth",
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
    let colour = "";
    if (eventData.highPriority == true) {
      colour = "#ffd6a5";
    } else {
      colour = "#d0bfff";
    }
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
      backgroundColor: colour,
    };
  };

  return (
    <div className="mb-6 h-128 w-full rounded-lg bg-white shadow border border-white/30">
      <div className="flex-grow h-full items-center justify-center font-bold text-black">
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
          slotEventOverlap={false}
          scrollTime="08:00:00"
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          displayEventEnd={true}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          locale="en-gb"
          dayHeaderFormat={{
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
          }}
          eventTextColor="black"
          eventClassNames={
            "text-center border-none px-1 flex font-semibold font-stretch-expanded"
          }
          eventBorderColor="white"
          eventDidMount={(info) => {
            const { title, start, end, extendedProps } = info.event;

            const groupName = extendedProps.group_name;
            // bro this tippy expects it as a string
            // in the data transformation step i didnt take in grp name for indiv grp so it becomes null
            const tooltipContent = `
              <div class = "text-sm p-2 rounded text-white flex text-center flex-col">
                <strong class = "text-base">${title}</strong>
                ${
                  groupName !== null
                    ? `<p class = "font-light">${groupName}</p>`
                    : ""
                }
                <p>${dayjs(start).format("DD MMM YYYY, hh:mm A")} - ${dayjs(
              end
            ).format("hh:mm A")}</p>
              </div>`;
            tippy(info.el, {
              content: tooltipContent,
              allowHTML: true,
              theme: "dark",
              placement: "bottom",
              followCursor: "vertical",
              arrow: true,
              inertia: true,
              appendTo: document.body,
            });
          }}
        />
      </div>
    </div>
  );
};
export default IndividualCalendar;
