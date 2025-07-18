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
import { toast } from "sonner";

// import { GetUserEvents } from '@/services/events/get-user-events-data2';
const headerToolbar = {
  start: "prev,today,next",
  center: "title",
  right: "timeGridDay,timeGridWeek,dayGridMonth",
};

const IndividualCalendar = ({ fetchEvents = () => {}, calendarRef }: any) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        toast.error("Error Loading Calendar", {
              richColors: true,
              position: "bottom-center",
            });
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
        event_participants: eventData.eventParticipants ?? null
      },
      backgroundColor: colour,
      borderColor: colour,
    };
  };

  return (
    <div className="mb-6 h-128 w-full rounded-lg bg-white shadow border border-white/30">
      <div className="flex-grow h-full items-center justify-center font-bold text-black">
        <FullCalendar
          ref={calendarRef}
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
          handleWindowResize={true}
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
          eventDidMount={(info) => {
            const { title, start, end, extendedProps } = info.event;

            const groupName = extendedProps.group_name;
            const hp = extendedProps.high_priority
              ? "high priority"
              : "low priority";
            //  tippy expects it as a string
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
            <p>${hp}</p>
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
