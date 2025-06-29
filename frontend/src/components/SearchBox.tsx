import { type Dispatch, type SetStateAction } from "react";

function MemberSearch({
  email,
  onClick,
}: {
  email: string;
  onClick: () => void;
}) {
  return (
    <p
      className="w-56 mx-auto overflow-ellipsis overflow-hidden whitespace-nowrap font-light cursor-pointer
hover:bg-slate-100 "
      onClick={onClick}
    >
      {email}
    </p>
  );
}

type EmailResultProps = {
  emails?: string[];
  isLoading: boolean;
  selectedEmails: string[];
  setSelectedEmails: Dispatch<SetStateAction<string[]>>;
};

export default function SearchBox({
  emails,
  selectedEmails,
  setSelectedEmails,
}: EmailResultProps) {
  return (
    <div className="relative w-full">
      <div className="flex absolute bg-slate-50 w-full overflow-auto border border-slate-200 rounded-b-lg z-index-20">
        <div className="p-1 flex flex-col items-center w-full">
          {(emails ?? []).map((email) => (
            <MemberSearch
              key={email}
              email={email}
              onClick={() => {
                if (!selectedEmails.includes(email)) {
                  setSelectedEmails((prev_arr) =>
                    prev_arr.includes(email) ? prev_arr : [...prev_arr, email]
                  );
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
