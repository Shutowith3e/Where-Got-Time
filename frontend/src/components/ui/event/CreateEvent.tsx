import SelectedMembers from "@/components/SelectedMembers";
import useGroup from "@/context/GroupContext";
import axiosInstance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
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
import { RRule } from "rrule";
import useAuth from "@/context/AuthContext";

type CreateEventModalProps = {
  gid: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type FormData = {
  emailArr: string[];
  eventName: string;
  startDate: string;
  startTime: string;
  endTime: string;

  recurring: boolean;
  highPriority: boolean;
  freq?: (typeof RRule.FREQUENCIES)[number];
  byweekday?: number;
  recurrsUntil?: string;
};

function createRrule({
  recurring,
  freq,
  byweekday,
  recurrsUntil,
  startDate,
  startTime,
}: FormData) {
  if (!recurring) return null;
  if (!freq) return null;
  let startDatetime = startDate + "T" + startTime;
  const startlocaltime = new Date(startDatetime);
  if (recurrsUntil) {
    recurrsUntil += "Z";
  }
  startDatetime += "Z";
  const startdtObj = new Date(startDatetime);
  switch (freq) {
    case "WEEKLY":
      return new RRule({
        freq: RRule.WEEKLY,
        byweekday: byweekday!,
        tzid: "Asia/Singapore",
        until: new Date(recurrsUntil!),
        dtstart: startdtObj,
      });
    case "MONTHLY":
      return new RRule({
        freq: RRule.MONTHLY,
        bymonthday: startlocaltime.getDate(),
        tzid: "Asia/Singapore",
        until: recurrsUntil ? new Date(recurrsUntil) : null,
        dtstart: startdtObj,
      });
    case "YEARLY":
      return new RRule({
        freq: RRule.YEARLY,
        bymonthday: startlocaltime.getDate(),
        bymonth: startlocaltime.getMonth() + 1,
        tzid: "Asia/Singapore",
        until: recurrsUntil ? new Date(recurrsUntil) : null,
        dtstart: startdtObj,
      });
  }
}

export default function CreateEventModal({
  gid,
  isOpen,
  setIsOpen,
}: CreateEventModalProps) {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
    clearErrors,
    watch,
    reset,
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    const {
      recurring,
      byweekday,
      freq,
      recurrsUntil,
      startDate,
      startTime,
      endTime,
      ...rest
    } = data;
    const fullForm = {
      ...rest,
      startDatetime: startDate + "T" + startTime,
      endDatetime: startDate + "T" + endTime,
      gid,
      emailArr: selectedEmails,
      rrule: createRrule(data)?.toString() ?? null,
    };

    await createEventMutation.mutateAsync(fullForm);
    queryClient.invalidateQueries({ queryKey: ["user-group", gid] });
  };
  const {
    groupInfo: { groupMembers, groupAdmins },
  } = useGroup();

  const [selectedEmails, setSelectedEmails] = useState<string[]>([
    ...groupMembers,
    ...groupAdmins,
  ]);

  const values = watch();
  const { personalGroupId } = useAuth();

  const queryClient = useQueryClient();
  const createEventMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosInstance.post("/admins/createEvent", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-group", gid] });
      queryClient.invalidateQueries({ queryKey: ["user-group-events", gid] });
      queryClient.invalidateQueries({ queryKey: ["user-events"] });
      queryClient.invalidateQueries({ queryKey: ["user-clashes"] });

      queryClient.refetchQueries({ queryKey: ["user-group-events", gid] });
      setIsOpen(false);
      reset();
    },
    onError: (error) => {
      return error;
    },
  });

  useEffect(() => {
    if (selectedEmails.length > 0) {
      clearErrors("emailArr");
    }
  }, [selectedEmails, clearErrors]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full ">
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Create Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center">
            {gid !== personalGroupId && (
              <>
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
              </>
            )}
          </div>

          <label className="font-semibold block mb-2 text-slate-700">
            {" "}
            *Event Name:{" "}
          </label>
          <input
            className="w-full rounded-2xl border border-purple-200 px-2 py-1"
            placeholder="Learning Journey to SMU"
            {...register("eventName", { required: true, maxLength: 25 })}
            aria-invalid={errors.eventName ? "true" : "false"}
          />
          {errors.eventName?.type === "required" && (
            <p role="alert" className="font-light text-sm text-red-600">
              *Event name is required
            </p>
          )}
          {errors?.eventName?.type === "maxLength" && (
            <p role="alert" className="font-light text-sm text-red-600">
              Event Name is too long!
            </p>
          )}

          <label className="font-semibold block mt-2 mb-2 text-slate-700">
            *Event Start Date:
          </label>
          <input
            className="w-full rounded-2xl border border-purple-200 px-2 py-1"
            type="date"
            {...register("startDate", {
              required: true,
            })}
            aria-invalid={errors.startDate ? "true" : "false"}
          />
          {errors.startDate?.type === "required" && (
            <p role="alert" className="font-light text-sm text-red-600">
              *Start Date is required
            </p>
          )}

          <label className="font-semibold block mt-2 mb-2 text-slate-700">
            *Event Start Time:
          </label>
          <input
            className="w-full rounded-2xl border border-purple-200 px-2 py-1"
            type="time"
            {...register("startTime", {
              required: true,
            })}
            aria-invalid={errors.startTime ? "true" : "false"}
          />
          {errors.startTime?.type === "required" && (
            <p role="alert" className="font-light text-sm text-red-600">
              *Start Time is required
            </p>
          )}

          <label className="font-semibold block mt-2 mb-2 text-slate-700">
            *Event End Time:
          </label>
          <input
            className="w-full rounded-2xl border border-purple-200 px-2 py-1"
            type="time"
            {...register("endTime", {
              required: "*End time is required",
              validate: (value, formValues) => {
                if (value <= formValues.startTime) {
                  return "*End time must be after start time";
                }
                return true;
              },
            })}
            aria-invalid={errors.endTime ? "true" : "false"}
          />
          {errors.endTime && (
            <p role="alert" className="font-light text-sm text-red-600">
              {errors.endTime.message?.toString()}
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
              {...register("recurring")}
            />
            <label className="font-semibold block">Recurring Event</label>
          </div>

          <div className="flex items-center m-auto gap-1 mt-2 text-slate-700">
            {values.recurring && (
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

                {values.freq === "WEEKLY" && (
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
                          Thursday
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
                  <input
                    {...register("recurrsUntil", {
                      validate: (value, formValues) => {
                        if (!value) {
                          return "Please input an end datetime";
                        } // all must have an until

                        // make sure end time < end event time
                        const endDatetime = new Date(
                          formValues.startDate + "T" + formValues.endTime
                        );
                        const endEventtime = new Date(value);
                        if (endDatetime >= endEventtime) {
                          return "*Chosen datetime must be after end of first occurance";
                        }
                      },
                    })}
                    type="datetime-local"
                  />
                  {errors.recurrsUntil && (
                    <p className="text-red-500 text-sm">
                      {errors.recurrsUntil?.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button type="submit" disabled={isLoading}>
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
