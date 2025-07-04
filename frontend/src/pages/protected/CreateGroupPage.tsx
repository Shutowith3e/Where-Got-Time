import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import SearchEmails from "@/components/SearchEmails";
import SelectedMembers from "@/components/SelectedMembers";
import axiosInstance from "@/lib/axios-instance";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateGroupPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    const fullForm = {
      ...data,
      emails_to_invite: selectedEmails,
    };
    createGroupMutation.mutate(fullForm);
  };

  const createGroupMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosInstance.post("/groups/createGroup", formData);
      return res.data;
    },
    onSuccess: () => {
      console.log("Group created");
      navigate("/mainGroup");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

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
            <div className="flex flex-col gap-2">
              <SearchEmails
                selectedEmails={selectedEmails}
                setSelectedEmails={setSelectedEmails}
              />
              <SelectedMembers
                selectedEmails={selectedEmails}
                setSelectedEmails={setSelectedEmails}
              />
              Group Name:
              <input
                {...register("group_name", { required: true })}
                aria-invalid={errors.group_name ? "true" : "false"}
                className="ml-2 rounded-full border-2 border-slate-100 px-2"
              />
              {errors.group_name?.type === "required" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  Group name is required
                </p>
              )}
            </div>
            <div className="flex flex-col">
              Group Description:
              <textarea
                {...register("group_description", { maxLength: 100 })}
                aria-invalid={errors.group_description ? "true" : "false"}
                className="border-2 border-slate-100 rounded-lg px-2"
              ></textarea>
              {errors?.group_description?.type === "maxLength" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  Group Description is too long!
                </p>
              )}
            </div>
            <input
              type="submit"
              value="Create Group"
              className="rounded-2xl bg-violet-100 p-1 px-4 hover:bg-violet-200"
            />
          </form>
        </MagicCard>
      </div>
    </>
  );
}
