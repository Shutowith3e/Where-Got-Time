import { IoMdCreate } from "react-icons/io";
import { Button } from "./ui/button";
import { useState } from "react";
import CreateEventModal from "./ui/event/CreateEvent";
import UpdateEventModal from "./ui/event/UpdateEvent";
import useGroup from "@/context/GroupContext";
import DeleteEvent from "./ui/event/DeleteEvent";
import { Dayjs } from "dayjs";
import { cn } from "@/lib/utlis";

type IndividualEvent = {
  eid: string;
  highPriority: boolean;
  group: string;
  eventName: string;
  date: Dayjs;
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
  const {
    groupInfo: { gid, isAdmin, groupName },
  } = useGroup();
  const { eid, highPriority, date, eventName } = eventData;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-row bg-violet-800/8 m-auto rounded-2xl text-base font-semibold px-8 py-1 gap-x-4 mt-2 min-w-45",
        highPriority && "bg-orange-600/10"
      )}
    >
      <div className="flex flex-row gap-8">
        <div className="flex flex-row gap-4.5">
          <div className="text-sm font-light m-auto">
            {date.format("DD MMM (hh:mm A)")}
          </div>
          {getEventString(eventData)}
          {highPriority && (
            <div className="text-sm font-light m-auto ">High Priority</div>
          )}
        </div>

        <div className="flex flex-row gap-3 m-auto">
          {isAdmin && (
            <>
              <Button
                variant="outline"
                className=" rounded-full w-5 h-6"
                onClick={() => setShowUpdateModal(true)}
              >
                <IoMdCreate />
              </Button>
              {showUpdateModal && (
                <UpdateEventModal
                  onClose={() => setShowUpdateModal(false)}
                  gid={gid}
                  eid={eid}
                />
              )}

              <DeleteEvent
                eid={eid}
                gid={gid}
                groupName={groupName}
                eventName={eventName}
              />
            </>
          )}
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
  const {
    groupInfo: { gid, isAdmin },
  } = useGroup();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col bg-white p-4 rounded-xl m-4 gap-y-0.5 drop-shadow-2xl drop-shadow-violet-900/20 z-10 max-h-[50dvh] overflow-y-scroll">
      <div className="flex flex-row justify-center gap-5">
        <h3 className="text-xl font-bold px-4 mb-4 ml-15">{title}</h3>
        {isAdmin && (
          <CreateEventModal
            isOpen={showCreateModal}
            setIsOpen={setShowCreateModal}
            gid={gid}
          />
        )}
      </div>
      {events
        .sort((a, b) => (a.date.isBefore(b.date) ? -1 : 1))
        .map((x, i) => (
          <EventChip key={i} event={x} getEventString={getEventString} />
        ))}
    </div>
  );
}
