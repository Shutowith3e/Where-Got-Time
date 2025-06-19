import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { IoMdSearch } from "react-icons/io";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utlis";
import { useDebounceCallback } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

export default function SearchEmails({
  selectedEmails,
  setSelectedEmails,
}: {
  selectedEmails: string[];
  setSelectedEmails: Dispatch<SetStateAction<string[]>>;
}) {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchTerm = useRef("");
  const {
    data: queriedEmails,
    isLoading: isSearchingEmails,
    refetch,
  } = useQuery({
    queryKey: ["email-search-term"],
    queryFn: async () => {
      // Prevent empty search terms from being queried
      if (!searchTerm.current) return;

      const { data } = await axiosInstance.get<string[]>(
        `/groups/searchEmails?searchTerm=${searchTerm.current}`
      );

      return data;
    },
    enabled: false,
  });

  const debounced = useDebounceCallback((newSearchTerm: string) => {
    searchTerm.current = newSearchTerm;
    refetch();
  }, 500);

  return (
    <div>
      <div
        className={cn(
          "rounded-t-lg bg-slate-50 px-4 py-1 flex flex-row items-center justify-center gap-4 relative",
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
          onBlur={() => setTimeout(() => setShowSearchBox(false), 200)}
        />
      </div>
      {showSearchBox && (
        <SearchBox
          emails={queriedEmails}
          isLoading={isSearchingEmails}
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
        />
      )}
    </div>
  );
}
