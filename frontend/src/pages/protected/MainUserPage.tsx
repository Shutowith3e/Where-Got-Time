import NavBar from "@/components/NavBar";
import MainUserDrawer from "@/components/MainUserPageDrawer";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { useQuery } from "@tanstack/react-query";
import { GetUserEvents } from "@/services/events/get-user-events-data";
import useAuth from "@/context/AuthContext";
import { GroupContextProvider } from "@/context/GroupContext";
import { getGroupInfo } from "@/services/groups/get-group-info";
import IndividualCalendar from "@/components/IndividualCalendar";
import IndividualEventCard from "@/components/IndividualEventCard";
import { useRef, useState } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { IoMdSearch } from "react-icons/io";
import ListView from "@/components/ListView";
import type FullCalendar from "@fullcalendar/react";

async function waitFor(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export default function MainUserPage() {
  const { personalGroupId } = useAuth();

  const { data: groupEventList } = useQuery({
    queryKey: ["user-events"],
    queryFn: () =>
      GetUserEvents().then((x) => x.filter((x) => x.gid === personalGroupId)),
  });

  const { data: group, isPending: isGroupsPending } = useQuery({
    queryKey: ["user-group", personalGroupId],
    queryFn: () => getGroupInfo(personalGroupId!),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const filteredEvents = (groupEventList ?? []).filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const calendarRef = useRef<FullCalendar>(null);

  const [currentView, setCurrentView] = useState("yourEvents");
  const showYourEvents = () => {
    setCurrentView("yourEvents");
  };
  const showAllUpcoming = () => {
    setCurrentView("allUpcoming");
  };

  if (!group || isGroupsPending) return <p>Loading...</p>;
  // kiv css "bg-gradient-to-b from-rose-900/5 to-violet-900/10"
  return (
    <GroupContextProvider groupInfo={group}>
      <div className="flex min-h-dvh flex-col ">
        <NavBar />

        <div className="flex flex-col">
          <SidebarProvider defaultOpen={true}>
            <MainUserDrawer />

            <div className="mt-2 ml-1">
              <SidebarTrigger
                onClick={async () => {
                  // Wait for drawer slide animation to
                  // finish before resizing
                  await waitFor(200);
                  calendarRef.current?.doResize();
                }}
              />
            </div>

            <div className="flex-1 px-3 py-6">
              <IndividualCalendar
                fetchEvents={GetUserEvents}
                calendarRef={calendarRef}
              />

              {/* Personal Group Events */}
              <div className="rounded-lg bg-white p-6">
                <div className="flex justify-center">
                  <button
                    onClick={showYourEvents}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Your Events
                  </button>
                  <button
                    onClick={showAllUpcoming}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    All Upcoming Events
                  </button>
                </div>

                <div className="rounded-xl bg-purple-100 px-4 py-2 text-sm shadow-inner">
                  {currentView === "yourEvents" && (
                    <>
                      <MagicCard
                        gradientColor="262626"
                        className="mx-auto rounded-2xl py-1.5 px-4 flex flex-row justify-center max-w-md"
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
                        title={"Personal Group"}
                        events={(filteredEvents ?? []).map(
                          ({
                            eid,
                            eventName,
                            startDatetime,
                            highPriority,
                          }) => ({
                            eid,
                            eventName,
                            group: "",
                            date: startDatetime,
                            highPriority,
                          })
                        )}
                        getEventString={({ eventName: event }) => event}
                      ></IndividualEventCard>
                    </>
                  )}
                  {currentView === "allUpcoming" && (
                    <ListView fetchEvents={GetUserEvents} />
                  )}
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </GroupContextProvider>
  );
}
