import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import { getGroupData, type GroupItem } from "@/services/groups/get-group-data";
import { useQuery } from "@tanstack/react-query";
import { GetUserEvents } from "@/services/events/get-user-events-data";
import dayjs from "dayjs";

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
          <p className="font-light text-sm text-center">Admin</p>
        ) : (
          <p className="font-extralight text-sm text-center">Member</p>
        )}
      </div>
      <p className="text-slate-600 text-sm font-light w-full overflow-ellipsis overflow-hidden whitespace-nowrap text-center">
        {groupDescription}
      </p>
    </Link>
  );
}

function GroupList({ filterSearch }: { filterSearch: string }) {
  const { data: groupList, isPending: isGroupsPending } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getGroupData,
  });
  if (isGroupsPending) {
    return (
      <ul className="grid grid-cols-2 gap-4 flex-wrap justify-center m-5 overflow-y-scroll max-h-[70vh]">
        {[...new Array(2).keys()].map(() => (
          <div className="h-26 rounded-3xl bg-slate-100 flex p-4 gap-2 flex-col">
            <div className="mx-auto text-lg">
              <div className="h-4 w-32 rounded-xl bg-slate-200 animate-pulse mx-auto" />
              <div className="h-3 w-16 rounded-xl mt-2 bg-slate-200 animate-pulse mx-auto" />
            </div>
            <div className="h-8 w-48 rounded-xl bg-slate-200 animate-pulse mx-auto" />
          </div>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-4 flex-wrap justify-center m-5 overflow-y-scroll max-h-[70vh]">
      {(groupList ?? [])
        .filter((x) =>
          x.groupName.toUpperCase().includes(filterSearch.toUpperCase())
        )
        .sort((a, b) => a.groupName.localeCompare(b.groupName))
        .map((x, i) => (
          <FilteredGroup key={i} item={x} />
        ))}
    </ul>
  );
}

export default function MainGroupPage() {
  const [inputValue, setInputValue] = useState("");

//to get user events 
  const { data: groupEventList, isPending: isUserEventsPending } = useQuery({
    queryKey: ["user-events"],
    queryFn: GetUserEvents,
  });

  //changes when u type into search bar
  const inputChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
  };

  if (isUserEventsPending) {
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
        <GroupList filterSearch={inputValue} />
        <EventCard
          title={"Group Events (In The Next 2 Weeks)"}
          events={(groupEventList ?? []).map(
            ({ groupName, eventName, startDatetime, highPriority }) => ({
              group: groupName,
              eventName: eventName,
              date: dayjs(startDatetime).format("DD MMM (hh:m A)"),
              highPriority,
            })
          )}
        ></EventCard>
      </div>
    </>
  );
}
