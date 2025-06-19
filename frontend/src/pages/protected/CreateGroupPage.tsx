import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import SearchEmails from "@/components/SearchEmails";
import SelectedMembers from "@/components/SelectedMembers";

import { useForm } from "react-hook-form";

export default function CreateGroupPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center bg-gradient-to-b from-rose-900/30 p-8 flex-col gap-4">
        <h1 className="text-center text-3xl font-semibold ">
          Create New Group
        </h1>
        <MagicCard gradientColor="262626" className="rounded-2xl p-8 gap-y-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <SearchEmails />
              <SelectedMembers />
              Group Name:
              <input
                {...register("groupName", { required: true })}
                aria-invalid={errors.groupName ? "true" : "false"}
                className="ml-2 rounded-full border-2 border-slate-100"
              />
              {errors.groupName?.type === "required" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  Group name is required
                </p>
              )}
            </div>
            <div className="flex flex-col">
              Group Description:{" "}
              <textarea
                {...register("groupDescription")}
                className="border-2 border-slate-100 rounded-lg"
              ></textarea>
            </div>
            <input
              type="submit"
              value="Create Group"
              className="rounded-2xl bg-violet-100 p-1 px-4"
            />
          </form>
        </MagicCard>
      </div>
    </>
  );
}
