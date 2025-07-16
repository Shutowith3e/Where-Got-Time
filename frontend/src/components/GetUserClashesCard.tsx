import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

type Clash = {
  eventName1: string;
  groupName1: string;
  eventName2: string;
  groupName2: string;
};

async function fetchClashes(): Promise<Clash[]> {

  const response = await axiosInstance.post("/users/getUserClashes");
  console.log(" backed raw clash data", response.data);

  const { adminClashes = [], memberClashes = [] } = response.data.data;
  const allClashes = [...memberClashes, ...adminClashes];
  console.log("combined clashes", allClashes);
  return allClashes;

}

function ClashCard({ clash, index }: { clash: Clash; index: number }) {
  return (

    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 shadow-sm w-full">
      <p className="font-bold text-red-600 text-sm mb-2">Clash {index + 1}</p>
      <div className="text-sm text-gray-800 space-y-1">

        <p>
          - <strong>{clash.eventName1}</strong> (
          <span className="text-gray-500">{clash.groupName1}</span>)
        </p>

        <p>
          - <strong>{clash.eventName2}</strong> (
          <span className="text-gray-500">{clash.groupName2}</span>)
        </p>

      </div>
    </div>
  );
}

export default function GetUserClashesCard() {
  const { data: clashes, isPending, isError } = useQuery({
    queryKey: ["user-clashes"],
    queryFn: fetchClashes,
  });

  if (isPending) 
    return (
    <p>Loading clashes...</p>
    );

  if (isError || !clashes) 
    return (
    <p>Error loading clashes</p>
    );

  if (clashes.length === 0)
    return (

      <div className="bg-white p-4 rounded-xl shadow w-full">
        <h3 className="text-md font-semibold text-center">Clashes</h3>
        <p className="text-sm text-green-600 text-center mt-2">
          No Clashes
        </p>
      </div>

    );

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h3 className="text-md font-semibold text-center mb-4">Clashes</h3>

      <p className="text-sm text-red-600 text-center mb-4">
        You have {clashes.length} clash{clashes.length > 1 ? "es" : ""}
      </p>

      <div className="flex flex-col gap-2">
        {clashes.map((clash, index) => (
          <ClashCard key={index} clash={clash} index={index} />
        ))}
      </div>

    </div>
  );
}
