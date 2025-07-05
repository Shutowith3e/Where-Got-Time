import SelectedMembers from "@/components/SelectedMembers";
import useGroup from "@/context/GroupContext";
import axiosInstance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

type CreateEventModalProps = {
  gid: string;
};

export default function CreateEventModal({ gid }: CreateEventModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm();
  const onSubmit = async (data: any) => {
    const fullForm = {
      ...data,
      gid,
      // emailArr: selectedEmails,
    };

    await createEventMutation.mutateAsync(fullForm);
  };
  const {
    groupInfo: { groupMembers, groupAdmins },
  } = useGroup();

  const [selectedEmails, setSelectedEmails] = useState<string[]>([
    ...groupMembers,
    ...groupAdmins,
  ]);

  const queryClient = useQueryClient();
  const createEventMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosInstance.post("/admins/createEvent", formData);
      return res.data;
    },
    onSuccess: () => {
      console.log("Event created");
      return queryClient.invalidateQueries({
        queryKey: ["user-group", gid],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  useEffect(() => {
    if (selectedEmails.length > 0) {
      clearErrors("emailArr");
    }
  }, [selectedEmails, clearErrors]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full ">
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Create Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center">
            <div className="min-w-[16rem]">
              <SelectedMembers
                selectedEmails={selectedEmails}
                setSelectedEmails={setSelectedEmails}
                {...register("emailArr", {
                  validate: () =>
                    selectedEmails.length > 0
                      ? true
                      : "*Selected Members cannot be empty",
                })}
                aria-invalid={errors.emailArr ? "true" : "false"}
              />
              {errors.emailArr && (
                <p
                  role="alert"
                  className="font-light text-sm text-red-600 flex flex-row"
                >
                  {errors.emailArr.message?.toString()}
                </p>
              )}
            </div>
            <div
              onClick={() =>
                setSelectedEmails([
                  ...(groupAdmins ?? []),
                  ...(groupMembers ?? []),
                ])
              }
              className="bg-slate-100 rounded-2xl inline-flex hover:bg-slate-200 p-1 px-4 cursor-pointer ml-80 justify-center"
            >
              Reset
            </div>
          </div>

          <label className="font-semibold block mb-2 text-slate-700">
            {" "}
            *Event Name:{" "}
          </label>
          <input
            className="w-full rounded-2xl border border-purple-200 px-2 py-1"
            placeholder="Learning Journey to SMU"
            {...register("eventName", { required: true })}
            aria-invalid={errors.eventName ? "true" : "false"}
          />
          {errors.eventName?.type === "required" && (
            <p role="alert" className="font-light text-sm text-red-600">
              *Event name is required
            </p>
          )}

          <label className="font-semibold block mt-2 mb-2 text-slate-700">
            *Event Start Date & Time:
          </label>
          <input
            className="w-full rounded-2xl border border-purple-200 px-2 py-1"
            type="datetime-local"
            {...register("startDatetime", {
              required: true,
            })}
            aria-invalid={errors.startDatetime ? "true" : "false"}
          />
          {errors.startDatetime?.type === "required" && (
            <p role="alert" className="font-light text-sm text-red-600">
              *Start Date & Time is required
            </p>
          )}

          <label className="font-semibold block mt-2 mb-2 text-slate-700">
            *Event End Date & Time:
          </label>
          <input
            className="w-full rounded-2xl border border-purple-200 px-2 py-1"
            type="datetime-local"
            {...register("endDatetime", {
              required: true,
              validate: (value, formValues) => {
                const start = new Date(formValues.startDatetime).getTime();
                const end = new Date(value).getTime();
                return (
                  end >= start || "*End date/time must be after start date/time"
                );
              },
            })}
            aria-invalid={errors.endDatetime ? "true" : "false"}
          />
          {errors.endDatetime && (
            <p role="alert" className="font-light text-sm text-red-600">
              {errors.endDatetime.message?.toString()}
            </p>
          )}

          <div className="flex items-center mt-5 gap-1 text-slate-700">
            <input
              type="checkbox"
              {...register("highPriority")}
              className="h-4 w-6"
            />
            <label className="font-semibold">High Priority</label>
          </div>

          <div className="flex items-center m-auto gap-1 mt-2 text-slate-700">
            <input type="checkbox" className="h-4 w-6" {...register("rrule")} />
            <label className="font-semibold block"> Recurring Event</label>
          </div>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button
              onClick={async () => {
                await createEventMutation.mutateAsync({ gid });
              }}
            >
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
