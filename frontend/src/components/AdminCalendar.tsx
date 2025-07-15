import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";
import useGroup from "@/context/GroupContext";
import dayjs from "dayjs";
import tippy from "tippy.js";

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

const AdminCalendar = ({ fetchEvents = () => {} }: any) => {
  const [events, setEvents] = useState([]);
  const { groupInfo } = useGroup();
  const totalMembers =
    (groupInfo?.groupAdmins?.length ?? 0) +
    (groupInfo?.groupMembers?.length ?? 0);
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
    const numParticipants = eventData.eventParticipants?.length ?? 0;
    const opacity =
      totalMembers > 0 ? Math.min(1, numParticipants / totalMembers) : 0.2;
    return {
      title: eventData.eventName,
      id: eventData.eid,
      start: eventData.startDatetime,
      end: eventData.endDatetime,
      rrule: eventData.rrule ? eventData.rrule : null,
      duration: {
        seconds: eventData.duration,
      },
      extendedProps: {
        high_priority: eventData.highPriority,
        event_participants: eventData.eventParticipants,
        group_name: eventData.groupName,
        opacity,
      },
      backgroundColor: `rgba(233, 149, 194, ${opacity})`,
      borderColor: `rgba(233, 149, 194, ${opacity})`,
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
          eventContent={() => <></>}
          expandRows={true}
          allDaySlot={false}
          headerToolbar={headerToolbar}
          events={events}
          eventDataTransform={dataTransformer}
          slotEventOverlap={false}
          scrollTime="08:00:00"
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          displayEventTime={false}
          locale="en-gb"
          dayHeaderFormat={{
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
          }}
          eventClassNames={
            "text-center border-none px-1 flex font-semibold font-stretch-expanded"
          }
          eventDidMount={(info) => {
            const { title, start, end, extendedProps } = info.event;

            const eventParticipants = extendedProps.event_participants;

            // bro this tippy expects it as a string
            // in the data transformation step i didnt take in grp name for indiv grp so it becomes null
            const tooltipContent = `
              <div class = "text-sm p-2 rounded text-white flex text-center flex-col">
              ${eventParticipants
                .map((email: string) => `<p class="font-medium">${email}</p>`)
                .join("")}
                <span class="font-light text-[10px] italic">${title}</span>
                <p class="font-light text-[10px] italic">${dayjs(start).format(
                  "DD MMM YYYY, hh:mm A"
                )} - ${dayjs(end).format("hh:mm A")}</p>
            
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
export default AdminCalendar;
