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
import { getGroupData } from "@/services/groups/get-group-data";
import { getIndividualGroupEvent } from "@/services/events/get-group-events-data";
import dayjs from "dayjs";
import IndividualEventCard from "@/components/IndividualEventCard";

//pls only tap group 1 from main user page, data is hard coded
//will throw into react hook form for the edit group button
//events stuff come from yongsoon

// use the prev end point, but only get the current group

export default function IndividualGroupPage() {
  // type Group = {
  //   gid: string;
  //   groupName: string;
  //   groupDescription: string;
  //   is_admin: boolean;
  //   admins: string[];
  //   members: string[];
  //   events: {
  //     name: string;
  //     date: string;
  //     members: string[];
  //   }[];
  // };

  const { id } = useParams();
  const { data: currentGroupInfo, isPending: isGroupsPending } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getGroupData,
  });

  const { data: currentGroupEvents, isPending: isEventPending } = useQuery({
    queryKey: ["user-group-events"],
    queryFn: () => getIndividualGroupEvent(id!),
  });

  if (!id) {
    return <p>Invalid Group ID!</p>;
  }

  const group = currentGroupInfo?.find((group) => group.gid === id);
  if (!group) {
    return <p>No Such Group!</p>;
  }

  const groupEvent = currentGroupEvents;
  if (!groupEvent) {
    return <p>No Such Group Event!</p>;
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

  return (
    <>
      <NavBar />

      {/* <p>{id}</p> */}

      <div className="flex flex-col p-2">
        <div className="gap-y-2">
          <h1 className="text-3xl font-semibold text-center ">
            {group.groupName.toUpperCase()}'S CALENDAR
          </h1>
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
          events={(groupEvent ?? []).map(
            ({ eventName, startDatetime, highPriority }) => ({
              eventName,
              group: "",
              date: dayjs(startDatetime).format("DD MMM (hh:m A)"),
              highPriority,
            })
          )}
          getEventString={({ eventName: event }) => event}
          isAdmin={group?.isAdmin}
        ></IndividualEventCard>
      </div>
    </>
  );
}
