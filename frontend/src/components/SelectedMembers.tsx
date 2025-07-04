import type { Dispatch, SetStateAction } from "react";
import { IoIosCloseCircle } from "react-icons/io";

function SelectedMember({
  email,
  removeMember,
}: {
  email: string;
  removeMember: () => void;
}) {
  return (
    <div className="flex flex-row items-center gap-1 max-w-full">
      <IoIosCloseCircle
        className="mt-1 cursor-pointer hover:bg-slate-200"
        onClick={removeMember}
      />
      <span className="overflow-ellipsis overflow-hidden truncate max-w-[12rem] whitespace-nowrap">
        {email}
      </span>
    </div>
  );
}

export default function SelectedMembers({
  selectedEmails,
  setSelectedEmails,
}: {
  selectedEmails: string[];
  setSelectedEmails: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className="flex flex-col p-1 border-2 border-slate-200 rounded-lg max-h-35 ">
      <span className="text-sm font-light text-slate-700 pb-1">
        Selected Members
      </span>
      <div className="p-1 overflow-y-scroll">
        {selectedEmails.map((selectedEmail) => (
          <SelectedMember
            key={selectedEmail}
            email={selectedEmail}
            removeMember={() =>
              setSelectedEmails((prev_arr) =>
                prev_arr.filter((e) => e !== selectedEmail)
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
