function MemberSearch({ email }: { email: string }) {
  return (
    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap font-light">
      {email}
    </p>
  );
}
export default function SearchBox() {
  return (
    <div className="flex absolute bg-slate-50 w-full border border-slate-200 rounded-b-lg z-index-20">
      <div className="p-1">
        <MemberSearch email="example@gmail.com" />
        <MemberSearch email="example@gmail.com" />
        <MemberSearch email="example@gmail.com" />
        <MemberSearch email="example@gmail.com" />
        <MemberSearch email="example@gmail.com" />
      </div>
    </div>
  );
}
