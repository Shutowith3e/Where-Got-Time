import { useState } from "react";

type DeleteEventModalProps = {
  onClose: () => void;
};

export default function DeleteEventModal({ onClose }: DeleteEventModalProps) {
  const [eventName, setEventName] = useState("");
  const [eventId, setEventId] = useState("");
  const [notify, setNotify] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-red-500">Delete Event</h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block font-medium">Event Name:</label>
          <input
            type="text"
            className="mt-1 w-full rounded border px-3 py-2"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Event ID:</label>
          <input
            type="text"
            className="mt-1 w-full rounded border px-3 py-2"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </div>

        {/* Notify Members Toggle */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="notify"
            className="h-4 w-4"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
          <label htmlFor="notify" className="text-sm font-medium">
            Notify Members
          </label>
        </div>

        {/* Buttons */}
        <div className="mb-2 flex justify-between">
          <button
            onClick={onClose}
            className="rounded border border-black px-4 py-2"
          >
            Back
          </button>
          <button className="rounded border border-black px-4 py-2">
            Save
          </button>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-gray-500 mt-1 text-red-500">
          Note: Event cannot be retrieved after it has been deleted!!!
        </p>
      </div>
    </div>
  );
}
