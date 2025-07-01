import useGroup from "@/context/GroupContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";
import { useForm } from "react-hook-form";

export default function EditGroup() {
  const {
    groupInfo: { gid, groupName, groupDescription },
  } = useGroup();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => {
    const fullForm = {
      gid,
      ...data,
    };
    editGroupMutation.mutate(fullForm);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const editGroupMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosInstance.post("/admins/editGroup", formData);
      return res.data;
    },
    onSuccess: () => {
      console.log("Group Edited Successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error?.message || "Something went wrong");
      setTimeout(() => setErrorMessage(""), 2500);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button
            className="max-w-fit rounded-2xl bg-white mx-auto px-4"
            variant={"outline"}
          >
            Edit Group
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <DialogHeader>
            <DialogTitle className="mx-auto">Edit Group Details</DialogTitle>

            <div className="flex flex-col gap-2">
              Group Name:
              <input
                value={groupName}
                {...register("group_name", { required: true })}
                aria-invalid={errors.group_name ? "true" : "false"}
                className="ml-2 rounded-full border-2 border-slate-100 px-2"
              />
              {errors.group_name?.type === "required" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  Group name is required
                </p>
              )}
              Group Description:
              <textarea
                {...register("group_description", { maxLength: 100 })}
                aria-invalid={errors.group_description ? "true" : "false"}
                className="border-2 border-slate-100 rounded-lg px-2"
                value={groupDescription || ""}
              ></textarea>
              {errors?.group_description?.type === "maxLength" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  Group Description is too long!
                </p>
              )}
            </div>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={editGroupMutation.isPending}
              className="rounded-2xl bg-violet-100 p-1 px-4 hover:bg-violet-200 text-slate-800"
            >
              Update Group Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
