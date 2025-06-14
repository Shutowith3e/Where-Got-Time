import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";

const groupList = [
  {
    gid: "55dd8f46-b6a1-471a-a6b2-0a042102919c",
    groupName: "group 1",
    groupDescription: "This is a group description",
    isAdmin: true,
  },
  {
    gid: "74cf7e70-1c97-405e-9957-0858f3968176",
    groupName: "abc 2",
    groupDescription: "testing 1 2 3",
    isAdmin: true,
  },
  {
    gid: "19980a33-6cbf-4520-adf5-81aa34142f67",
    groupName: "abc 3",
    groupDescription: "blue flex box red text",
    isAdmin: false,
  },
  {
    gid: "1a418fb8-d234-4ef7-9a11-91f464057636",
    groupName: "abc 4",
    groupDescription:
      "this is a very very very very very long good description. NOTHING BEATS A JET 2 HOLIDAY AND RIGHT NOW U CAN SAVE 50 POUNDS, PER PERSON. THATS 200 POUNDS OFF FOR A FAMILY OF FOUR",
    isAdmin: false,
  },

  {
    gid: "55dd8f46-b6a1-471a-a6b2-0a042102919c",
    groupName: "group 1",
    groupDescription: "This is a group description",
    isAdmin: true,
  },
  {
    gid: "74cf7e70-1c97-405e-9957-0858f3968176",
    groupName: "abc 2",
    groupDescription: "testing 1 2 3",
    isAdmin: true,
  },
  {
    gid: "19980a33-6cbf-4520-adf5-81aa34142f67",
    groupName: "abc 3",
    groupDescription: "blue flex box red text",
    isAdmin: false,
  },
  {
    gid: "1a418fb8-d234-4ef7-9a11-91f464057636",
    groupName: "abc 4",
    groupDescription:
      "this is a very very very very very long good description. NOTHING BEATS A JET 2 HOLIDAY AND RIGHT NOW U CAN SAVE 50 POUNDS, PER PERSON. THATS 200 POUNDS OFF FOR A FAMILY OF FOUR",
    isAdmin: false,
  },
  {
    gid: "55dd8f46-b6a1-471a-a6b2-0a042102919c",
    groupName: "group 1",
    groupDescription: "This is a group description",
    isAdmin: true,
  },
  {
    gid: "74cf7e70-1c97-405e-9957-0858f3968176",
    groupName: "abc 2",
    groupDescription: "testing 1 2 3",
    isAdmin: true,
  },
  {
    gid: "19980a33-6cbf-4520-adf5-81aa34142f67",
    groupName: "abc 3",
    groupDescription: "blue flex box red text",
    isAdmin: false,
  },
  {
    gid: "1a418fb8-d234-4ef7-9a11-91f464057636",
    groupName: "abc 4",
    groupDescription:
      "this is a very very very very very long good description. NOTHING BEATS A JET 2 HOLIDAY AND RIGHT NOW U CAN SAVE 50 POUNDS, PER PERSON. THATS 200 POUNDS OFF FOR A FAMILY OF FOUR",
    isAdmin: false,
  },
];

type GroupItem = (typeof groupList)[number];

function FilteredGroup({
  item: { gid, groupName, groupDescription },
}: {
  item: GroupItem;
}) {
  return (
    <Link
      to={`/indivGroup/${gid}`}
      className="flex basis-1/3 flex-col text-slate-900 bg-slate-100 p-4 rounded-3xl font-semibold hover:bg-slate-200 items-center gap-2 "
    >
      <p className="mx-auto">{groupName.toUpperCase()}</p>
      <p className="text-slate-600 text-sm font-light w-full overflow-ellipsis overflow-hidden whitespace-nowrap text-center">
        {groupDescription}
      </p>
    </Link>
  );
}

export default function MainGroupPage() {
  const [inputValue, setInputValue] = useState("");

  const inputChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
  };

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
