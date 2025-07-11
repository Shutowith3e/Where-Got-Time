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

  if (!group || isGroupsPending) return <p>Loading...</p>;

  return (
    <GroupContextProvider groupInfo={group}>
      <div className="flex min-h-dvh flex-col bg-gradient-to-b from-rose-900/30 ">
        <NavBar />

        <div className="flex flex-1 flex-row">
          <SidebarProvider defaultOpen={false}>
            <MainUserDrawer />

            <div className="mt-2 ml-1">
              <SidebarTrigger />
            </div>

            <div className="flex-1 px-3 py-6">
              <IndividualCalendar fetchEvents={GetUserEvents} />

              {/* Personal Group Events */}
              <div className="rounded-lg bg-white p-6">
                <div className="rounded-xl bg-purple-100 px-4 py-2 text-sm shadow-inner">
                  <IndividualEventCard
                    title={"Personal Group"}
                    events={(groupEventList ?? []).map(
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
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </GroupContextProvider>
  );
}
