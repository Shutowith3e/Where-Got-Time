import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";

// import { GetUserEvents } from '@/services/events/get-user-events-data2';
const headerToolbar = {
  start: "listWeek,listMonth",
  center: "title",
  right: "prev,next",
};

const ListView = ({ fetchEvents = () => {} }: any) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        return error;
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

  //   const eventload = (info:any) =>{
  // 	return ( <div>Event: {info.event.title}<br/>
  // 	<small>{info.event.group_name}</small>
  // 	</div>
  // 	)
  //   }
  return (
    <div className="mb-6 h-128 w-full rounded-lg bg-white shadow">
      <div className="flex-grow h-full items-center justify-center font-bold text-black">
        <FullCalendar
          plugins={[listPlugin, rrulePlugin]}
          initialView="listWeek"
          height={"100%"}
          headerToolbar={headerToolbar}
          events={events}
          eventDataTransform={dataTransformer}
          slotEventOverlap={false}
          displayEventEnd={true}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
          }}
          locale="en-gb"
          buttonText={{
            listWeek: "week",
            listMonth: "Month",
          }}
        />
      </div>
    </div>
  );
};
export default ListView;
