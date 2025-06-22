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

//pls only tap group 1 from main user page, data is hard coded
//will throw into react hook form for the edit group button
//events stuff come from yongsoon

// use the prev end point, but only get the current group
function CurrentGroupInfo(id: string) {
  const { data: currentGroupInfo, isPending: isGroupsPending } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getGroupData,
  });

  const group = currentGroupInfo?.find((group) => group.gid === id);
  return { group, isGroupsPending };
}

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
  if (!id) {
    return <p>Invalid Group ID!</p>;
  }
  const { group, isGroupsPending } = CurrentGroupInfo(id);
  if (!group){
    return <p>No Such Group!</p>;
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

  // const [group, setGroup] = useState<Group | null>(null);
  // useEffect(() => {
  //   //mock data, will replace with calls to be later
  //   const data = [
  //     {
  //       gid: "55dd8f46-b6a1-471a-a6b2-0a042102919c",
  //       groupName: "group 1",
  //       groupDescription: "This is a group description",
  //       is_admin: true,
  //       admins: ["u1", "u2"],
  //       members: ["u3", "u4"],
  //       events: [
  //         {
  //           name: "Attend Heap Workshop",
  //           date: "2025-08-10 16:30:00",
  //           members: ["u1", "u2", "u3", "u4"],
  //         },
  //         {
  //           name: "Attend API Workshop",
  //           date: "2025-09-10 12:30:00",
  //           members: ["u1", "u2", "u3"],
  //         },
  //       ],
  //     },
  //   ];

  //   const findGroup = data.find((g) => g.gid === id);
  //   setGroup(findGroup || null);
  //   return;
  // }, []);

  // if (!group) return "Invalid";

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
        {/* <div className="flex flex-row gap-1 mx-auto ">
          Admins:
          {group.admins.map((a, index) => (
            <p key={index}>{a} </p>
          ))}
        </div>
        <div className="flex flex-row gap-1 mx-auto ">
          Members:
          {group.members.map((a, index) => (
            <p key={index}>{a} </p>
          ))}
        </div>

        <div className="mx-auto p-4">
          {group.events
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((event, index) => (
              <div key={index} className="p-2">
                <p>Date: {event.date}</p>
                <p>Event Name: {event.name}</p>
                <p className="flex flex-row gap-1">
                  Members Attending:
                  {event.members.map((member, index) => (
                    <p key={index}>{member}</p>
                  ))}
                </p>
              </div>
            ))}
        </div> */}
      </div> 
    </>
  );
}
