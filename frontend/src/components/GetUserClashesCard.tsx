import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

// Types
export type AdminClashChip = {
  eventName1: string;
  eventName2: string;
  groupName1: string;
  groupName2: string;
  affectedMembers: string[] | null;
  otherGrpAdmins: string[] | null;
};

export type MemberClashChip = {
  eventName1: string;
  eventName2: string;
  groupName1: string;
  groupName2: string;
};

type ClashCardProps = {
  adminClashes: AdminClashChip[];
  memberClashes: MemberClashChip[];
};

async function fetchClashes(): Promise<ClashCardProps> {
  const response = await axiosInstance.post("/users/getUserClashes");
  const { adminClashes, memberClashes } = response.data.data;
  return { adminClashes, memberClashes };
}

function AdminClashCardChip({
  eventName1,
  eventName2,
  groupName1,
  groupName2,
  affectedMembers,
  otherGrpAdmins,
}: AdminClashChip) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-2 shadow-sm w-full text-sm text-center">
      <p className="font-bold text-rose-900 mb-1">Admin</p>
      <div className="flex flex-col space-y-1 text-center">
        <p className="truncate font-semibold">Event: {eventName1}</p>
        <p className="truncate font-light ">Group: {groupName1}</p>
        <p className="truncate font-semibold">Event: {eventName2}</p>
        <p className="truncate font-light">Group: {groupName2}</p>
      </div>

      {affectedMembers && affectedMembers.length > 0 && (
        <div className="mt-3 text-xs text-center">
          <div>
            <p className="font-semibold text-rose-900">Affected Members:</p>
            <div className="flex flex-wrap gap-1">
              {affectedMembers.map((email, i) => (
                <span
                  key={i}
                  className=" px-2 py-0.5 rounded-full text-xs truncate max-w-full text-rose-900"
                  title={email}
                >
                  {email}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

  
      {otherGrpAdmins && otherGrpAdmins.length > 0 && (
        <div className="mt-2 text-xs text-center">
          <p className="font-semibold ">Other Admins:</p>
          <div className="flex flex-wrap gap-1">
            {otherGrpAdmins.map((admin, i) => (
              <span
                key={i}
                className="px-2 rounded-full text-xs truncate max-w-full"
                title={admin}
              >
                {admin}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MemberClashCardChip({
  eventName1,
  eventName2,
  groupName1,
  groupName2,
}: MemberClashChip) {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-2 shadow-sm w-full text-sm text-center">
      <p className="font-bold text-amber-900/75 mb-1">Member</p>
      <div className="flex flex-col space-y-1 text-center">
        <p className="truncate overflow-hidden whitespace-nowrap font-semibold">
          Event: {eventName1}
        </p>
        <p className="truncate overflow-hidden whitespace-nowrap font-light ">
          Group: {groupName1}
        </p>
        <p className="truncate overflow-hidden whitespace-nowrap font-semibold">
          Event: {eventName2}
        </p>
        <p className="truncate overflow-hidden whitespace-nowrap font-light">
          Group: {groupName2}
        </p>
      </div>
    </div>
  );
}

function ClashCard({ clash }: { clash: ClashCardProps }) {
  const { adminClashes, memberClashes } = clash;

  return (
    <div className="flex flex-col gap-4">
      {adminClashes?.map((adminClash, i) => (
        <AdminClashCardChip key={i} {...adminClash} />
      ))}
      {memberClashes?.map((memberClash, i) => (
        <MemberClashCardChip key={i} {...memberClash} />
      ))}
    </div>
  );
}

export default function GetUserClashesCard() {
  const {
    data: clashes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user-clashes"],
    queryFn: fetchClashes,
  });

  if (isPending) return <p>Loading clashes...</p>;

  if (isError || !clashes)
    return <p className="text-red-600">Error loading clashes</p>;

  const totalClashes =
    (clashes.adminClashes?.length || 0) + (clashes.memberClashes?.length || 0);

  if (totalClashes === 0)
    return (
      <div className="bg-white p-4 rounded-xl shadow w-full">
        <h3 className="text-md font-semibold text-center">Clashes</h3>
        <p className="text-sm text-black text-center mt-2">No Clashes</p>
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h3 className="text-md font-semibold text-center mb-4">Clashes</h3>
      <p className="text-sm text-black text-center mb-4">
        You have <span className="font-bold">{totalClashes}</span> clash
        {totalClashes > 1 ? "es" : ""}
      </p>
      <ClashCard clash={clashes} />
    </div>
  );
}
