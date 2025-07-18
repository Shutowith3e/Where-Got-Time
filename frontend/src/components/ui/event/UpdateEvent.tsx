import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RRule } from "rrule";
import dayjs from "dayjs";
import axiosInstance from "@/lib/axios-instance";
import SelectedMembers from "@/components/SelectedMembers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useGroup from "@/context/GroupContext";
import useAuth from "@/context/AuthContext";
import { toast } from "sonner";

type UpdateEventModalProps = {
  gid: string;
  eid: string;
  eventName: string;
  startDatetime: string;
  endDatetime: string;
  rrule?: string | null;
  highPriority: boolean;
  eventParticipants?: string[] | null;
  onClose: () => void;
};

type FormData = {
  eventName: string;
  startDate: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  freq?: (typeof RRule.FREQUENCIES)[number];
  byweekday?: string[];
  recurrsUntil?: string;
  highPriority: boolean;
  emailArr: string[];
};

export default function UpdateEventModal({
  gid,
  eid,
  eventName,
  startDatetime,
  endDatetime,
  rrule,
  highPriority,
  eventParticipants,
  onClose,
}: UpdateEventModalProps) {
  const queryClient = useQueryClient();
  const { personalGroupId } = useAuth();
  const {
    groupInfo: { groupMembers, groupAdmins },
  } = useGroup();
  if (!eventParticipants) {
    eventParticipants = []; //temp solution for when u go to user
  }
  const [initialEmails] = useState(eventParticipants);
  const [selectedEmails, setSelectedEmails] = useState([...initialEmails]);

  const rule = rrule ? RRule.fromString(rrule) : null;
  let recurring = false;
  if (rule) {
    recurring = true;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      eventName,
      startDate: dayjs(startDatetime).format("YYYY-MM-DD"),
      startTime: dayjs(startDatetime).format("HH:mm"),
      endTime: dayjs(endDatetime).format("HH:mm"),
      recurring: recurring,
      freq: rule ? RRule.FREQUENCIES[rule.options.freq] : undefined,
      byweekday: rule?.options.byweekday
        ? (Array.isArray(rule.options.byweekday)
            ? rule.options.byweekday
            : [rule.options.byweekday]
          ).map((d) => d.toString())
        : [],
      recurrsUntil: rule?.options.until
        ? dayjs(rule.options.until + "+16:00").format("YYYY-MM-DDTHH:mm")
        : "",
      highPriority,
      emailArr: [],
    },
  });

  const values = watch();

  function createRrule(values: FormData) {
    if (!values.recurring || !values.freq) return null;
    const dtstart = new Date(`${values.startDate}T${values.startTime}Z`);
    const until = values.recurrsUntil
      ? new Date(values.recurrsUntil + "Z")
      : undefined;

    switch (values.freq) {
      case "WEEKLY":
        return new RRule({
          freq: RRule.WEEKLY,
          dtstart,
          until,
          byweekday: (values.byweekday ?? []).map((d) => Number(d)),
          tzid: "Asia/Singapore",
        });
      case "MONTHLY":
        return new RRule({
          freq: RRule.MONTHLY,
          dtstart,
          until,
          bymonthday: dtstart.getUTCDate(),
          tzid: "Asia/Singapore",
        });
      case "YEARLY":
        return new RRule({
          freq: RRule.YEARLY,
          dtstart,
          until,
          bymonth: dtstart.getMonth() + 1,
          bymonthday: dtstart.getUTCDate(),
          tzid: "Asia/Singapore",
        });
      default:
        return null;
    }
  }

  const updateEventMutation = useMutation({
    mutationFn: async (formData: any) => {
      const payload = {
        eid,
        gid,
        event_name: formData.eventName,
        start_datetime: `${formData.startDate}T${formData.startTime}:00Z`,
        end_datetime: `${formData.startDate}T${formData.endTime}:00Z`,
        high_priority: formData.highPriority,
        rrule: createRrule(formData)?.toString() ?? null,
        old_email_arr: initialEmails,
        new_email_arr: selectedEmails,
      };
      const res = await axiosInstance.patch("/admins/updateEvent", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-group", gid] });
      queryClient.invalidateQueries({ queryKey: ["user-events"] });
      queryClient.invalidateQueries({ queryKey: ["user-clashes"] });
      toast.success(`Event updated successfully!`, {
        richColors: true,
        position: "bottom-center",
      });
      onClose();
    },
    onError: () => {
      toast.error("Error Updating Event", {
        richColors: true,
        position: "bottom-center",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    updateEventMutation.mutate(data);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Update Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {gid !== personalGroupId && (
            <>
              <SelectedMembers
                allEmails={[...groupAdmins, ...groupMembers]}
                selectedEmails={selectedEmails}
                setSelectedEmails={setSelectedEmails}
              />
              <div
                className="bg-slate-100 rounded-2xl inline-flex hover:bg-slate-200 p-1 px-4 cursor-pointer ml-80 justify-center"
                onClick={() =>
                  setSelectedEmails([...groupAdmins, ...groupMembers])
                }
              >
                Reset
              </div>
            </>
          )}

          <label className="font-semibold block">*Event Name:</label>
          <input
            className="w-full rounded-2xl border px-2 py-1"
            {...register("eventName", { required: true, maxLength: 25 })}
          />
          {errors.eventName && (
            <p className="text-red-600 text-sm">*Event name is required</p>
          )}

          <label className="font-semibold block">*Start Date:</label>
          <input
            type="date"
            {...register("startDate", { required: true })}
            className="w-full rounded-2xl border px-2 py-1"
          />

          <label className="font-semibold block">*Start Time:</label>
          <input
            type="time"
            {...register("startTime", { required: true })}
            className="w-full rounded-2xl border px-2 py-1"
          />

          <label className="font-semibold block">*End Time:</label>
          <input
            type="time"
            {...register("endTime", {
              required: true,
              validate: (value, { startTime }) =>
                value > startTime || "*End time must be after start time",
            })}
            className="w-full rounded-2xl border px-2 py-1"
          />
          {errors.endTime && (
            <p className="text-red-600 text-sm">{errors.endTime.message}</p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" {...register("highPriority")} />
            <label className="font-semibold">High Priority</label>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" {...register("recurring")} />
            <label className="font-semibold">Recurring Event</label>
          </div>

          {values.recurring && (
            <div className="space-y-2">
              <label className="font-semibold">Repeat Frequency:</label>
              <div className="flex gap-3">
                {["WEEKLY", "MONTHLY", "YEARLY"].map((freq) => (
                  <label key={freq}>
                    <input
                      type="radio"
                      value={freq}
                      {...register("freq", {
                        required: "Please select a frequency",
                      })}
                    />{" "}
                    {freq}
                  </label>
                ))}
              </div>
              {errors.freq && (
                <p className="text-red-600 text-sm">
                  {errors.freq.message?.toString()}
                </p>
              )}

              {values.freq === "WEEKLY" && (
                <div className="flex flex-wrap gap-3">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day, idx) => (
                    <label key={idx}>
                      <input
                        type="checkbox"
                        value={idx.toString()}
                        {...register("byweekday", {
                          required: "Pick at least 1 day",
                        })}
                      />{" "}
                      {day}
                    </label>
                  ))}
                  {errors.byweekday && (
                    <p className="text-red-600 text-sm">
                      {errors.byweekday.message?.toString()}
                    </p>
                  )}
                </div>
              )}

              <label className="font-semibold">Repeat Until:</label>
              <input
                type="datetime-local"
                {...register("recurrsUntil", {
                  validate: (val, { startDate, endTime }) => {
                    if (!val) return true;
                    const until = new Date(val);
                    const endFirst = new Date(`${startDate}T${endTime}`);
                    return (
                      until > endFirst ||
                      "*Repeat until must be after first end time"
                    );
                  },
                })}
                className="w-full rounded-2xl border px-2 py-1"
              />
              {errors.recurrsUntil && (
                <p className="text-red-600 text-sm">
                  {errors.recurrsUntil.message?.toString()}
                </p>
              )}
            </div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose>Cancel</DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
