import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import { getGroupData, type GroupItem } from "@/services/get-group-data";
import { useQuery } from "@tanstack/react-query";

function FilteredGroup({
  item: { gid, groupName, groupDescription, isAdmin },
}: {
  item: GroupItem;
}) {
  return (
    <Link
      to={`/indivGroup/${gid}`}
      className="flex basis-1/3 flex-col text-slate-900 bg-slate-100 p-4 rounded-3xl font-semibold hover:bg-slate-200 items-center gap-2 "
    >
      <div className="mx-auto text-lg">
        {groupName.toUpperCase()}
        {isAdmin ? (
          <p className="font-light text-sm">Admin</p>
        ) : (
          <p className="font-extralight text-sm">Member</p>
        )}
      </div>
      <p className="text-slate-600 text-sm font-light w-full overflow-ellipsis overflow-hidden whitespace-nowrap text-center">
        {groupDescription}
      </p>
    </Link>
  );
}

export default function MainGroupPage() {
  const [inputValue, setInputValue] = useState("");

  const { data: groupList, isLoading } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getGroupData,
  });

  const inputChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
  };

  if (isLoading || !groupList) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col bg-gradient-to-b from-rose-900/30 p-5">
        <MagicCard
          gradientColor="262626"
          className="mx-auto rounded-2xl py-1.5 px-30 flex flex-row justify-center"
        >
          <div className="text-slate-500 flex gap-2">
            <IoMdSearch className="flex m-auto" />
            <input
              type="text"
              placeholder="Search For Groups ..."
              value={inputValue}
              onChange={inputChange}
              className="outline-none"
            />
          </div>
        </MagicCard>
        <ul className="grid grid-cols-2 gap-4 flex-wrap justify-center m-5 overflow-y-scroll max-h-[70vh]">
          {groupList
            .filter((x) =>
              x.groupName.toUpperCase().includes(inputValue.toUpperCase())
            )
            .sort((a, b) => a.groupName.localeCompare(b.groupName))
            .map((x, i) => (
              <FilteredGroup key={i} item={x} />
            ))}
        </ul>
        <EventCard
          title={"Group Events (In The Next 2 Weeks)"}
          events={[
            {
              group: "test123",
              count: 10,
              event: "Attend Heap Workshop",
              date: "2025-08-10 16:30:00",
            },
            {
              group: "test234",
              count: 20,
              event: "Attend API Workshop",
              date: "2025-07-11 12:20:00",
            },
            {
              group: "test",
              count: 50,
              event: "Workshop",
              date: "2025-06-10 00:00:00",
            },
          ]}
        ></EventCard>
      </div>
    </>
  );
}
