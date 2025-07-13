import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { IoIosClose } from "react-icons/io";
import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

type AllPendingGroups = {
  PendingGroups: IndivPendingGroup[];
};

type IndivPendingGroup = {
  gid: string;
  groupName: string;
  groupDescription: string;
};

type PendingGroupChipProps = {
  groupName: string;
  groupDescription: string;
};

async function getPendingGroups(): Promise<AllPendingGroups> {
  const { data } = await axiosInstance.post("/groups/getPendingGroups");
  return {
    PendingGroups: data.map(
      ({
        groupName,
        groupDescription,
        gid,
      }: IndivPendingGroup): IndivPendingGroup => ({
        groupName,
        groupDescription,
        gid,
      })
    ),
  };
}

function PendingGroupChip({
  groupName,
  groupDescription,
}: PendingGroupChipProps) {
  return (
    <div className="flex flex-col items-center bg-blue-50 rounded-2xl text-sm mt-2 px-4 py-2 w-full max-w-full">
      <div className="text-center w-full">
        <p className="font-semibold text-black truncate">{groupName}</p>
        <p className="text-black font-light truncate">{groupDescription ?? ""}</p>
      </div>
      <div className="flex justify-center gap-x-2 mt-2">
        <Button variant="outline" className="rounded-full w-6 h-6 p-0">
          <Check className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="rounded-full w-6 h-6 p-0">
          <IoIosClose className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function GetPendingGroupsCard() {
  const { data: allPendingGroups, isPending: isGroupsPending } = useQuery({
    queryKey: ["pending-groups"],
    queryFn: getPendingGroups,
  });
  if (isGroupsPending) {
    return <p>Loading...</p>;
  }
  // console.log(allPendingGroups);

  // if length >1 u got "s" at the back for no. of invites
  return (
    <div className="rounded-xl bg-white p-4 shadow w-full">
      <h3 className="text-md font-semibold text-center">Group Invites</h3>
      <p className="mt-2 text-sm text-gray-600 text-center">
        You have {allPendingGroups?.PendingGroups.length} group invite
        {allPendingGroups?.PendingGroups.length !== 1 && "s"}
      </p>

      {allPendingGroups?.PendingGroups.map((group) => (
        <PendingGroupChip
          key={group.gid}
          groupName={group.groupName}
          groupDescription={group.groupDescription}
        />
      ))}
    </div>
  );
}
