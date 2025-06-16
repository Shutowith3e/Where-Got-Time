import { useState } from "react";

type UpdateEventModalProps = {
  onClose: () => void;
};

export default function UpdateEventModal({ onClose }: UpdateEventModalProps) {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recurring, setRecurring] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-yellow-600">Update Event</h2>

        {/* Members Portion */}
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
        </div>

        {/* Form Portion */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            placeholder="Event Name"
            className="rounded border px-3 py-2"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="date"
            className="rounded border px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            placeholder="Start Time"
            className="rounded border px-3 py-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            placeholder="End Time"
            className="rounded border px-3 py-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <input
            placeholder="Recurring"
            className="rounded border px-3 py-2"
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
          />
          <input
            placeholder="Priority"
            className="rounded border px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Description"
          className="mb-4 w-full rounded border px-3 py-2"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-between">
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
      </div>
    </div>
  );
}
