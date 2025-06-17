import { IoMdSearch } from "react-icons/io";

export default function SearchEmails() {
  return (
    <div className="rounded-lg bg-slate-50 px-4 py-1 flex flex-row items-center justify-center gap-4 mb-4">
      <IoMdSearch />
      <input placeholder="Search For Emails ..." className="outline-none" />
    </div>
  );
}
