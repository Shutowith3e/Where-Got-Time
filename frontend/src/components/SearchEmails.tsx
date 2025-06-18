import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utlis";

type SearchEmailProps = {};

export default function SearchEmails({}: SearchEmailProps) {
  const [showSearchBox, setShowSearchBox] = useState(false);

  return (
    <div>
      <div
        className={cn(
          "rounded-t-lg bg-slate-50 px-4 py-1 flex flex-row items-center justify-center gap-4",
          !showSearchBox && "rounded-b-lg"
        )}
      >
        <IoMdSearch />
        <input
          placeholder="Search For Emails ..."
          className="outline-none"
          onFocus={() => setShowSearchBox(true)}
          onBlur={() => setShowSearchBox(false)}
        />
      </div>
      {showSearchBox && <SearchBox />}
    </div>
  );
}
