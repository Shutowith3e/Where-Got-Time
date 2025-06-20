import NavBar from "@/components/NavBar";
import { useState } from "react";
import CreateEventModal from "@/components/CreateEvent";
import UpdateEventModal from "@/components/UpdateEvent";
import DeleteEventModal from "@/components/DeleteEvent";

export default function MainUserPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-rose-900/30 ">
      <NavBar />

      {/* Wrap main content and sidebar horizontally */}
      <div className="flex flex-1 flex-row">

        {/* Left content */}
        <div className="flex-1 px-6 py-6">

          {/* Week Navigation */}
          <div className="mb-5 flex items-center justify-center gap-5">
            <button className="rounded bg-gray-400 px-4 py-2 text-white">◀</button>
            <span className="font-semibold">Week</span>
            <button className="rounded bg-gray-400 px-4 py-2 text-white">▶</button>
          </div>

          {/* Calendar Placeholder */}
          <div className="mb-6 h-96 w-full rounded-lg bg-white shadow">
            <p className="flex h-full items-center justify-center font-bold text-gray-400">
              CALENDAR (FULL HEIGHT)
            </p>
          </div>

          {/* Your Events */}
          <div className="rounded-lg bg-white p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between">
              <h2 className="text-lg font-semibold">Your Events</h2>

              <div className="flex gap-3">
              {/* Create Event Button */}
              <button
              onClick={() => setShowCreateModal(true)}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Create Event
              </button>
              {showCreateModal && <CreateEventModal onClose={() => setShowCreateModal(false)} />}

              {/* Update Event Button */}
              <button
              onClick={() => setShowUpdateModal(true)}
              className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"> Update Event
              </button>
              {showUpdateModal && <UpdateEventModal onClose={() => setShowUpdateModal(false)} />}

              {/* Delete Event Button */}
              <button
              onClick={() => setShowDeleteModal(true)}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
              Delete Event
              </button>
              {showDeleteModal && <DeleteEventModal onClose={() => setShowDeleteModal(false)} />}
            </div>
          </div>


            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm shadow-inner">
              <p>
                <strong>Upcoming Event:</strong> Attend SMU Heap Front-end Workshop
              </p>
            </div>
          </div>
        </div>


        {/* Right sidebar */}
        <aside className="bg-purple-400 w-72 flex-shrink-0 p-6 md:block">
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="text-md font-semibold">Notification / grp invites</h3>
            <p className="mt-2 text-sm text-red-500">You have X schedule clashes</p>
            
            {/* Event Conflict Placeholder*/}
            <div className="mt-4 rounded-md bg-gray-100 p-2 text-sm">

              <p> <strong>Clash:</strong> A event - Group 1 </p>

              <p>B event - Group 2</p>

            </div>

          </div>
        </aside>

      
      </div>
      
      </div>
    
  );
}
