function SelectedMember({ email }: { email: string }) {
  return (
    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
      {email}
    </p>
  );
}

export default function SelectedMembers() {
  return (
    <div className="flex flex-col p-1 border-2 border-slate-200 rounded-lg max-h-35 ">
      <p className="text-sm font-light text-slate-700 pb-1">Selected Members</p>
      <div className="p-1 overflow-y-scroll">
        <SelectedMember email="example@gmail.com" />
        <SelectedMember email="example@gmail.com" />
        <SelectedMember email="example@gmail.com" />
        <SelectedMember email="example@gmail.com" />
        <SelectedMember email="example@gmail.com" />
        <SelectedMember email="example@gmail.com" />
      </div>
    </div>
  );
}
