import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utlis";
import { useDebounceCallback } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

export default function SearchEmails() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    isLoading: isSearchingEmails,
    refetch,
  } = useQuery({
    queryKey: ["email-search-term"],
    queryFn: async () => {
      return axiosInstance.get<string[]>(
        `/groups/searchEmails?searchTerm=${searchTerm}`
      );
    },
    enabled: !!searchTerm,
  });

  const debounced = useDebounceCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
    refetch();
  }, 500);

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
          type="text"
          onChange={(event) => debounced(event.target.value)}
          placeholder="Search For Emails ..."
          className="outline-none"
          onFocus={() => setShowSearchBox(true)}
          onBlur={() => setShowSearchBox(false)}
        />
      </div>
      {showSearchBox && (
        <SearchBox
          emails={searchTerm ? data?.data : undefined}
          isLoading={isSearchingEmails}
        />
      )}
    </div>
  );
}
