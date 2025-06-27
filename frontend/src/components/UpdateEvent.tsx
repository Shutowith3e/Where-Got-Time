import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type UpdateEventModalProps = {
  onClose: () => void;
  gid: string;
  eid: string;
};

export default function UpdateEventModal({
  gid,
  eid,
  onClose,
}: UpdateEventModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => {
    const fullForm = {
      ...data,
      gid,
      eid,
    };
    updateEventMutation.mutate(fullForm);
    console.log(fullForm);
  };

  const updateEventMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosInstance.post("/admins/updateEvent", formData);
      return res.data;
    },
    onSuccess: () => {
      console.log("Event created");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 rounded-2xl">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-black">
          Update Event
        </h2>

        {/* Members Portion
        <div className="mb-6 rounded-lg bg-purple-100 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold">Members</h3>
            <button className="rounded-full bg-gray-400 px-3 py-1 text-white">
              Select Members
            </button>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <p className="text-sm text-gray-500">+5 more</p>
          </div>
        </div> */}

        {/* Form Portion */}
        <div className="mb-6 rounded-lg bg-white-100 p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="gap-2">
              <label className="font-bold block mt-2 mb-2">
                {" "}
                *Event Name:{" "}
              </label>
              <input
                className="w-full rounded border border-purple-500 px-3 py-2"
                placeholder="Learning Journey to SMU"
                {...register("eventName", { required: true })}
                aria-invalid={errors.eventName ? "true" : "false"}
              />
              {errors.eventName?.type === "required" && (
                <p role="alert" className="font-light text-sm text-red-600">
                  *Event name is required
                </p>
              )}

              {/* <label className="font-bold block mt-2 mb-2"> Event Description: </label>
            <input 
            className="w-full rounded border border-purple-500 px-3 py-2"
            placeholder="Explore SCIS facilities"
            {...register("eventDescription")} /> */}

              <label className="font-bold block mt-2 mb-2">
                {" "}
                *Event Start Date & Time:
              </label>
              <input
                className="w-full rounded border border-purple-500 px-3 py-2"
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

              <label className="font-bold block mt-2 mb-2">
                {" "}
                *Event End Date & Time:
              </label>
              <input
                className="w-full rounded border border-purple-500 px-3 py-2"
                type="datetime-local"
                {...register("endDatetime", {
                  required: true,
                  validate: (value, formValues) => {
                    const start = new Date(formValues.startDatetime).getTime();
                    const end = new Date(value).getTime();
                    return (
                      end >= start ||
                      "*End date/time must be after start date/time"
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

              <label className="font-bold block mt-2 mb-2"> Recurring: </label>
              <input
                className="w-full rounded border border-purple-500 px-3 py-2"
                {...register("rrule")}
              />

              <div className=" flex items-center mt-2">
                <input
                  type="checkbox"
                  {...register("highPriority")}
                  className="h-4 w-6"
                />
                <label className="font-bold">High Priority</label>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="rounded-2xl bg-white p-1 px-4 border"
              >
                Back
              </button>

              <input
                type="submit"
                value="Update"
                className="rounded-2xl bg-orange-100 hover:bg-orange-200 p-1 px-4 border"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
