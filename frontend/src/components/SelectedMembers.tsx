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

function NonSelectedMember({
  email,
  addMember,
}: {
  email: string;
  addMember: () => void;
}) {
  return (
    <div
      className="flex flex-row items-center gap-1 max-w-full cursor-pointer"
      onClick={addMember}
    >
      <span className="overflow-ellipsis overflow-hidden truncate max-w-[12rem] whitespace-nowrap ml-1">
        {email}
      </span>
    </div>
  );
}

export default function SelectedMembers({
  allEmails,
  selectedEmails,
  setSelectedEmails,
}: {
  allEmails?: string[];
  selectedEmails: string[];
  setSelectedEmails: Dispatch<SetStateAction<string[]>>;
}) {
  if (!allEmails) {
    allEmails = [];
  }

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
        {allEmails
          .filter((email) => !selectedEmails.includes(email))
          .map((remainingEmail) => (
            <NonSelectedMember
              key={remainingEmail}
              email={remainingEmail}
              addMember={() => {
                setSelectedEmails((prev_arr) => [...prev_arr, remainingEmail]);
              }}
            />
          ))}
      </div>
    </div>
  );
}
