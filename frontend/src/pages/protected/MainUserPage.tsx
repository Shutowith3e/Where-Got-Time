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
import { useState } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { IoMdSearch } from "react-icons/io";

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

  if (!group || isGroupsPending) return <p>Loading...</p>;
  // kiv css "bg-gradient-to-b from-rose-900/5 to-violet-900/10"
  return (
    <GroupContextProvider groupInfo={group}>
      <div className="flex min-h-dvh flex-col ">
        <NavBar />

        <div className="flex flex-1 flex-row">
          <SidebarProvider defaultOpen={false}>
            <MainUserDrawer />

            <div className="mt-2 ml-1">
              <SidebarTrigger />
            </div>

            <div className="flex-1 px-3 py-6">
              <IndividualCalendar fetchEvents={GetUserEvents} />

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
                  ({ eid, eventName, startDatetime, highPriority }) => ({
                    eid,
                    eventName,
                    group: "",
                    date: startDatetime,
                    highPriority,
                  })
                )}
                getEventString={({ eventName: event }) => event}
              ></IndividualEventCard>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </GroupContextProvider>
  );
}
