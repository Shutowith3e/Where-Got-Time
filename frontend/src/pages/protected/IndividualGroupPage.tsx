import NavBar from "@/components/NavBar";
import { useParams } from "react-router-dom";
import IndividualCalendar from "@/components/IndividualCalendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import IndividualEventCard from "@/components/IndividualEventCard";
import { getGroupInfo } from "@/services/groups/get-group-info";
import { GroupContextProvider } from "@/context/GroupContext";
import IndividualGroupLayout from "./IndividualGroupLayout";

//pls only tap group 1 from main user page, data is hard coded
//will throw into react hook form for the edit group button
//events stuff come from yongsoon

// use the prev end point, but only get the current group

export default function IndividualGroupPage() {
  const { id } = useParams();
  const { data: group, isPending: isGroupsPending } = useQuery({
    queryKey: ["user-group", id],
    queryFn: () => getGroupInfo(id!),
  });

  // const { data: groupEvent, isPending: isEventPending } = useQuery({
  //   queryKey: ["user-group-events", id],
  //   queryFn: () => getIndividualGroupEvent(id!),
  // });

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

  // if (isEventPending) {
  //   return (
  //     <div className="flex flex-col bg-white p-4 rounded-xl m-4 gap-y-0.5 drop-shadow-xl drop-shadow-rose-800/8 ">
  //       <h3 className="text-xl mx-auto font-bold px-4 mb-4"></h3>
  //     </div>
  //   );
  // }

  if (!group) {
    return <p>No Such Group!</p>;
  }

  // if (!groupEvent) {
  //   return <p>No Such Group Event!</p>;
  // }
  return (
    <GroupContextProvider groupInfo={group}>
      <NavBar />
      <IndividualGroupLayout>
        <div className="flex flex-col px-2">
          <div className="gap-y-2">
            <div className="flex flex-row justify-center">
              <h1 className="text-3xl font-semibold text-center ">
                {group.groupName.toUpperCase()}'S CALENDAR
              </h1>
            </div>
            <div className="flex justify-center ">
              {group?.isAdmin && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Edit Group</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Group Details</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div>
                      <p>Group Name: {group.groupName}</p>
                      <p>Group Description: {group.groupDescription}</p>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Update</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
          <p className="text-lg font-light mx-auto p-2">
            {group.groupDescription}
          </p>
          <IndividualCalendar></IndividualCalendar>

          <IndividualEventCard
            title={"All Group Events"}
            events={group.events.map(
              ({ eid, eventName, startDatetime, highPriority }) => ({
                eid,
                eventName,
                group: "",
                date: dayjs(startDatetime).format("DD MMM (hh:m A)"),
                highPriority,
              })
            )}
            getEventString={({ eventName: event }) => event}
          />
        </div>
      </IndividualGroupLayout>
    </GroupContextProvider>
  );
}
