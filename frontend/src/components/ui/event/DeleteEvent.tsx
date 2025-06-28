import { useForm } from "react-hook-form";

type DeleteEventModalProps = {
  onClose: () => void;
};

export default function DeleteEventModal({ onClose }: DeleteEventModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-red-500">Delete Event</h2>

        <div className="mb-6 rounded-lg bg-white-100 p-4">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        >

          <div className="gap-2">
            <label className="font-bold block mt-2 mb-2">* Event Name:</label> 
            <input
            className="w-full rounded border border-purple-500 px-3 py-2"
            placeholder="Supplementary Lesson"
            {...register("eventName", { required: true })}
            aria-invalid={errors.eventName ? "true" : "false"}
            />
            {errors.eventName?.type === "required" && (
            <p role="alert" className="font-light text-sm text-red-600">
            *Event name is required
            </p>
            )}
          </div>

          <div>
            <label className="font-bold block mt-2 mb-2">* Event ID:</label> 
            <input
            className="w-full rounded border border-purple-500 px-3 py-2"
            placeholder="88888"
            {...register("eventID", { required: true })}
            aria-invalid={errors.eventID ? "true" : "false"}
            />
            {errors.eventID?.type === "required" && (
            <p role="alert" className="font-light text-sm text-red-600">
            *Event ID is required
            </p>
            )}
          </div>

          <div className="mt-2 mb-2">
          <input
          type="checkbox"
          {...register("notifyMembers")}
          className="h-4 w-6"
          />
          <label className="font-bold">
          Notify Members
          </label>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-between">
          <button
          onClick={onClose}
          className="rounded-2xl bg-white p-1 px-4 border">
          Back
          </button>

          <input
          type="submit"
          value="Delete"
          className="rounded-2xl bg-red-500 p-1 px-4 border"
          />
          </div>

        {/* Note */}
        <p className="text-center text-small font-bold mt-1 text-red-500">
        Note: Event cannot be retrieved after it has been deleted!!!
        </p>
          
        </form>
        </div>

      </div>
    </div>
  );
}
