import { MagicCard } from "@/components/magicui/magic-card";
import NavBar from "@/components/NavBar";
import SearchEmails from "@/components/SearchEmails";
import SelectedMembers from "@/components/SelectedMembers";
import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateGroupPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    const fullForm = {
      ...data,
      emailsToInvite: selectedEmails,
    };
    createGroupMutation.mutate(fullForm);
  };

  const createGroupMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosInstance.post("/groups/createGroup", formData);
      return res.data;
    },
    onSuccess: () => {
      navigate("/mainGroup");
    },
    onError: () => {
      toast.error("Error Creating Group", {
        richColors: true,
        position: "bottom-center",
      });
    },
  });
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  useEffect(() => {
    if (selectedEmails.length > 0) {
      clearErrors("emailsToInvite");
    }
  }, [selectedEmails, clearErrors]);

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center bg-gradient-to-b from-rose-900/30 p-8 flex-col gap-4">
        <h1 className="text-center text-3xl font-semibold text-slate-800">
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
                {...register("emailsToInvite", {
                  validate: () => {
                    if (selectedEmails.length === 0) {
                      return "Selected Members cannot be empty";
                    }
                    if (selectedEmails.length >= 50) {
                      return "Too Many Members Added";
                    }
                  },
                })}
                aria-invalid={errors.emailsToInvite ? "true" : "false"}
              />
              {errors.emailsToInvite && (
                <p
                  role="alert"
                  className="font-light text-sm text-red-600 flex flex-row"
                >
                  {errors.emailsToInvite.message?.toString()}
                </p>
              )}
              Group Name:
              <input
                {...register("group_name", { required: true, maxLength: 30 })}
                aria-invalid={errors.group_name ? "true" : "false"}
                className="ml-2 rounded-full border-2 border-slate-100 px-2"
              />
              {errors.group_name?.type === "required" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  Group name is required
                </p>
              )}
              {errors.group_name?.type === "maxLength" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  Group name is too long
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
