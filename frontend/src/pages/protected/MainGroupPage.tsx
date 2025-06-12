import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

export default function MainGroupPage() {
  const groupList = [
    "55dd8f46-b6a1-471a-a6b2-0a042102919c",
    "74cf7e70-1c97-405e-9957-0858f3968176",
    "19980a33-6cbf-4520-adf5-81aa34142f67",
    "1a418fb8-d234-4ef7-9a11-91f464057636",
  ];

  const [inputValue, setInputValue] = useState("");

  const inputChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col">
        <MagicCard
          gradientColor="262626"
          className="mx-auto rounded-2xl py-1.5 px-30 flex flex-row justify-center"
        >
          <p className="text-slate-500 flex gap-2">
            <IoMdSearch className="flex m-auto" />
            <input
              type="text"
              placeholder="Search For Groups ..."
              value={inputValue}
              onChange={inputChange}
              className="outline-none"
            />
          </p>
        </MagicCard>
        <ul className="flex flex-col items-center gap-2">
          {groupList
            .filter((x) => x.toLowerCase().includes(inputValue.toLowerCase()))
            .map((x) => (
              <li>{x}</li>
            ))}
        </ul>
      </div>
    </>
  );
}
