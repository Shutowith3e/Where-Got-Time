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
    watch,
  } = useForm();
  const onSubmit = async (data: any) => {
    const fullForm = {
      ...data,
      gid,
      rrule: recurring || null,
      emailArr: selectedEmails,
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

  const [recurring, setRecurring] = useState(false);
  const freq = watch("freq");

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
                // make sure start time < end time
                const start = new Date(formValues.startDatetime).getTime();
                const end = new Date(value).getTime();
                const startDate = new Date(formValues.startDatetime).getDate();
                const endDate = new Date(value).getDate();
                if (end <= start) {
                  return "*End date/time must be after start date/time";
                }
                if (startDate != endDate) {
                  return "*Event must start and end on the same day";
                }
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
            <input
              type="checkbox"
              className="h-4 w-6"
              {...register("rrule")}
              onChange={() => setRecurring(!recurring)}
            />
            <label className="font-semibold block">Recurring Event</label>
          </div>

          <div className="flex items-center m-auto gap-1 mt-2 text-slate-700">
            {recurring && (
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <label className="font-semibold">Repeat Frequency: </label>
                  <label>
                    <input
                      type="radio"
                      {...register("freq", {
                        required: "Please select a repeat frequency",
                      })}
                      value="WEEKLY"
                    />
                    Weekly
                  </label>
                  <label>
                    <input
                      type="radio"
                      {...register("freq", {
                        required: "Please select a repeat frequency",
                      })}
                      value="MONTHLY"
                    />
                    Monthly
                  </label>
                  <label>
                    <input
                      type="radio"
                      {...register("freq", {
                        required: "Please select a repeat frequency",
                      })}
                      value="YEARLY"
                    />
                    Yearly
                  </label>
                </div>
                {errors.freq && (
                  <p className="text-red-500 text-sm">
                    {errors.freq?.message?.toString()}
                  </p>
                )}

                {/* Allow user to choose the days of the weeks to recur on if its WEEKLY */}
                {/* count starts from 0. E.g. => mon=0, tues=1 */}

                {freq === "WEEKLY" && (
                  <div className="flex flex-row gap-2">
                    <label className="font-semibold flex flex-row">
                      Recur on:{" "}
                    </label>
                    <div className="flex flex-wrap gap-x-3.5">
                      <div className="flex flex-row ">
                        <label>
                          <input
                            type="checkbox"
                            {...register("byweekday", {
                              required: "Please select at least 1 day",
                            })}
                            value="0"
                          />
                          Monday
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label>
                          <input
                            type="checkbox"
                            {...register("byweekday", {
                              required: "Please select at least 1 day",
                            })}
                            value="1"
                          />
                          Tuesday
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label>
                          <input
                            type="checkbox"
                            {...register("byweekday", {
                              required: "Please select at least 1 day",
                            })}
                            value="2"
                          />
                          Wednesday
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label>
                          <input
                            type="checkbox"
                            {...register("byweekday", {
                              required: "Please select at least 1 day",
                            })}
                            value="3"
                          />
                          Thrusday
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label>
                          <input
                            type="checkbox"
                            {...register("byweekday", {
                              required: "Please select at least 1 day",
                            })}
                            value="4"
                          />
                          Friday
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label>
                          <input
                            type="checkbox"
                            {...register("byweekday", {
                              required: "Please select at least 1 day",
                            })}
                            value="5"
                          />
                          Saturday
                        </label>
                      </div>
                      <div className="flex flex-row">
                        <label>
                          <input
                            type="checkbox"
                            {...register("byweekday", {
                              required: "Please select at least 1 day",
                            })}
                            value="6"
                          />
                          Sunday
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {errors.byweekday && (
                  <p className="text-red-500 text-sm">
                    {errors.byweekday?.message?.toString()}
                  </p>
                )}

                <div>
                  <label className="font-semibold">Repeat Until: </label>
                  <input {...register("until")} type="datetime-local" />
                </div>
                <div>
                  <label className="font-semibold">Timezone: </label>
                  <input
                    {...register("tzid")}
                    defaultValue="Asia/Singapore"
                    readOnly
                  />{" "}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
