function MemberSearch({ email }: { email: string }) {
  return (
    <p className="w-58 overflow-ellipsis overflow-hidden whitespace-nowrap font-light ">
      {email}
    </p>
  );
}

type EmailResultProps = {
  emails?: string[];
  isLoading: boolean;
};
export default function SearchBox({ emails }: EmailResultProps) {
  return (
    <div className="flex absolute bg-slate-50 w-full border border-slate-200 rounded-b-lg z-index-20">
      <div className="p-1 flex-col">
        {(emails ?? []).map((email) => (
          <MemberSearch email={email} />
        ))}
      </div>
    </div>
  );
}
