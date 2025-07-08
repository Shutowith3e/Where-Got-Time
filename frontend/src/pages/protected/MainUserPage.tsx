import NavBar from "@/components/NavBar";
import { useState } from "react";
import CreateEventModal from "@/components/ui/event/CreateEvent";
import MainUserDrawer from "@/components/MainUserPageDrawer";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import {
  GetUserEvents,
  getUserEventsInRange,
} from "@/services/events/get-user-events-data";
import EventCard from "@/components/ui/event/EventCard";
import useAuth from "@/context/AuthContext";
import { GroupContextProvider } from "@/context/GroupContext";
import { getGroupInfo } from "@/services/groups/get-group-info";
import IndividualCalendar from "@/components/IndividualCalendar";

export default function MainUserPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { personalGroupId } = useAuth();

  const { data: groupEventList } = useQuery({
    queryKey: ["user-events"],
    queryFn: () =>
      getUserEventsInRange(2, "weeks").then((x) =>
        x.filter((x) => x.gid === personalGroupId)
      ),
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
              <IndividualCalendar fetchEvents={() => GetUserEvents()} />

              {/* Your Events */}
              <div className="rounded-lg bg-white p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between">
                  <h2 className="text-lg font-semibold">Personal Group</h2>

                  <div className="flex gap-3">
                    {/* Create Event Button */}
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Create Event
                    </button>
                    {showCreateModal && (
                      <CreateEventModal
                        isOpen={showCreateModal}
                        setIsOpen={setShowCreateModal}
                        gid={personalGroupId}
                      />
                    )}
                  </div>
                </div>

                <div className="rounded-xl bg-purple-100 px-4 py-2 text-sm shadow-inner">
                  <EventCard
                    title={"Upcoming Events"}
                    events={(groupEventList ?? []).map(
                      ({
                        groupName,
                        eventName,
                        startDatetime,
                        highPriority,
                      }) => ({
                        group: groupName,
                        eventName: eventName,
                        date: dayjs(startDatetime).format("DD MMM (hh:m A)"),
                        highPriority,
                      })
                    )}
                  ></EventCard>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </GroupContextProvider>
  );
}
