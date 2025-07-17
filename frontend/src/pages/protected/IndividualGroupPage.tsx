import NavBar from "@/components/NavBar";
import { useParams } from "react-router-dom";
import IndividualCalendar from "@/components/IndividualCalendar";
import { useQuery } from "@tanstack/react-query";
import IndividualEventCard from "@/components/IndividualEventCard";
import { getGroupInfo } from "@/services/groups/get-group-info";
import { GroupContextProvider } from "@/context/GroupContext";
import IndividualGroupLayout from "./IndividualGroupLayout";
import EditGroup from "@/components/admin/EditGroup";
import { getIndividualGroupEvent } from "@/services/events/get-group-events-data";
import { useRef, useState } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { IoMdSearch } from "react-icons/io";
import AdminCalendar from "@/components/AdminCalendar";
import type FullCalendar from "@fullcalendar/react";
import { GetHighPriorityEvents } from "@/services/admins/get-high-priority-data";
import { TabsList } from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

//pls only tap group 1 from main user page, data is hard coded
//will throw into react hook form for the edit group button
//events stuff come from yongsoon

// use the prev end point, but only get the current group

export default function IndividualGroupPage() {
  const { id } = useParams();
  const calendarRef = useRef<FullCalendar>(null);

  const { data: group, isPending: isGroupsPending } = useQuery({
    queryKey: ["user-group", id],
    queryFn: () => getGroupInfo(id!),
  });

  const { data: groupEvent, isPending: isEventPending } = useQuery({
    queryKey: ["user-group-events", id],
    queryFn: () => getIndividualGroupEvent(id!),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const filteredEvents = (groupEvent ?? []).filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!id) {
    return <p>Invalid Group ID!</p>;
  }

  if (isGroupsPending) {
    return (
      <div className="flex flex-col p-2">
        <div className="gap-y-2">
          <h1 className="text-3xl font-semibold text-center rounded-xl bg-slate-200 animate-pulse"></h1>
          <div className="flex justify-center ">
            <p className="text-lg font-light mx-auto p-2 rounded-xl bg-slate-200 animate-pulse"></p>
          </div>
        </div>
      </div>
    );
  }


  if (isEventPending) {
    return (
      <div className="flex flex-col bg-white p-4 rounded-xl m-4 gap-y-0.5 drop-shadow-xl drop-shadow-rose-800/8 ">
        <h3 className="text-xl mx-auto font-bold px-4 mb-4"></h3>
      </div>
    );
  }

  if (!group) {
    return <p>No Such Group!</p>;
  }

  // if (!groupEvent) {
  //   return <p>No Such Group Event!</p>;
  // }
  return (
    <GroupContextProvider groupInfo={group}>
      <NavBar />
      <IndividualGroupLayout calendarRef={calendarRef}>
        <div className="flex flex-col px-2">
          <div className="gap-y-2">
            <div className="flex flex-row justify-center">
              <h1 className="text-3xl font-semibold text-center">
                {group.groupName.toUpperCase()}'S CALENDAR
              </h1>
            </div>
            <div className="flex justify-center ">
              {group?.isAdmin && <EditGroup />}
            </div>
          </div>
          <p className="text-lg font-light mx-auto p-2">
            {group.groupDescription}
          </p>
          <div>
            <Tabs defaultValue="groupCalendar">
              <TabsList className="bg-slate-100 flex flex-row rounded-lg flex-wrap mt-2">
                <TabsTrigger value="groupCalendar">Group Calendar</TabsTrigger>
                {group?.isAdmin && (
                  <TabsTrigger value="freeTime">Find Free Time</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="groupCalendar">
                <IndividualCalendar
                  fetchEvents={() => getIndividualGroupEvent(id)}
                  calendarRef={calendarRef}
                />
              </TabsContent>
              <TabsContent value="freeTime">
                <AdminCalendar
                  fetchEvents={() => GetHighPriorityEvents(id)}
                  calendarRef={calendarRef}
                />
              </TabsContent>
            </Tabs>
          </div>

          <MagicCard
            gradientColor="262626"
            className="mx-auto rounded-2xl py-1.5 px-30 flex flex-row justify-center"
          >
            <div className="text-slate-500 flex gap-2">
              <IoMdSearch className="flex m-auto" />
              <input
                type="text"
                placeholder="Search For Events ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none"
              />
            </div>
          </MagicCard>
                
          <IndividualEventCard
            title={"All Group Events"}
            events={filteredEvents.map(
              ({ eid, eventName, startDatetime, highPriority,eventParticipants,endDatetime }) => ({
                eid,
                eventName,
                group: "",
                date: startDatetime,
                // date: dayjs(startDatetime).format("DD MMM (hh:mm A)"),
                highPriority,
                eventParticipants,
                endDatetime
              })
            )}
            getEventString={({ eventName: event }) => event}
          />
        </div>
      </IndividualGroupLayout>
    </GroupContextProvider>
  );
}
