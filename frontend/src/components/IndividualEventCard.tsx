import { IoIosClose, IoMdCreate } from "react-icons/io";
import { Button } from "./ui/button";
import { useState } from "react";
import CreateEventModal from "./CreateEvent";
import UpdateEventModal from "./UpdateEvent";

type IndividualEvent = {
  highPriority: boolean;
  group: string;
  eventName: string;
  date: string;
};

type EventChipProps = {
  event: IndividualEvent;
  getEventString: (event: IndividualEvent) => string;
};

export type EventCardProps = {
  title: string;
  events: IndividualEvent[];
  getEventString?: (eventData: IndividualEvent) => string;
};

function EventChip({ event: eventData, getEventString }: EventChipProps) {
  const { highPriority, date } = eventData;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  return (
    <div className="flex flex-row bg-slate-100 m-auto rounded-2xl text-base font-semibold px-8 py-1 gap-x-4 mt-2 min-w-45">
      <div className="flex flex-row gap-8">
        <div className="flex flex-row gap-4.5">
          <div className="text-sm font-light m-auto">{date}</div>
          {getEventString(eventData)}
          {highPriority && (
            <div className="text-sm font-light m-auto ">High Priority</div>
          )}
        </div>

        <div className="flex flex-row gap-3 m-auto">
          <Button variant="outline" className=" rounded-full w-5 h-6" onClick={()=>setShowUpdateModal(true)}>
            <IoMdCreate />
          </Button>
          {showUpdateModal && (<UpdateEventModal onClose={()=>setShowUpdateModal(false)}/>)}
          <Button variant="outline" className="rounded-full w-5 h-6 ">
            <IoIosClose />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function IndividualEventCard({
  title,
  events,
  getEventString = ({ group, eventName }) =>
    `${group.toUpperCase()} - ${eventName}`,
}: EventCardProps) {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl m-4 gap-y-0.5 drop-shadow-xl drop-shadow-rose-800/8 ">
      <div className="flex flex-row justify-center gap-5">
        <h3 className="text-xl font-bold px-4 mb-4 ml-15">{title}</h3>
        <Button variant={"outline"} onClick={() => setShowCreateModal(true)}>
          {" "}
          Create Event
        </Button>
        {showCreateModal && (
          <CreateEventModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
      {events
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((x, i) => (
          <EventChip key={i} event={x} getEventString={getEventString} />
        ))}
    </div>
  );
}
