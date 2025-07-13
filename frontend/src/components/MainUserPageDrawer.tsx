import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "./ui/sidebar/sidebar";
import { getPendingGroupInvites } from "@/services/groups/getPendingGroupInvites";

export default function MainUserDrawer() {
  const {
    invites,
    isLoading,
    isError,
    error,
    acceptInvite,
    declineInvite,
  } = getPendingGroupInvites();

  return (
    <Sidebar side="left" variant="sidebar" className="mt-15 h-auto">
      <SidebarHeader />
      <SidebarContent className="p-4 flex flex-col gap-4">

        {/* Box 1: Clash Notifications */}
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="text-md font-semibold">Notifications</h3>
          <p className="mt-2 text-sm text-red-500">You have X schedule clashes</p>
          <div className="mt-4 rounded-md bg-gray-100 p-2 text-sm">
            <p><strong>Clash:</strong> A event - Group 1</p>
            <p>B event - Group 2</p>
          </div>
        </div>

        {/* Box 2: Group Invites */}
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="text-md font-semibold mb-2">Group Invites</h3>

          {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
          {isError && (
            <p className="text-sm text-red-500">
              Failed to load invites: {(error as any)?.message}
            </p>
          )}

          {!isLoading && invites.length === 0 && (
            <p className="text-sm text-gray-600">No pending invites.</p>
          )}

          {!isLoading && invites.length > 0 && (
            <div className="space-y-4">
              {invites.map((invite) => (
                <div
                  key={invite.gid}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
                >
                  <div className="mb-2 max-w-full">
                    <h4
                      className="text-md font-semibold text-gray-800 truncate"
                      title={invite.groupName ?? "Unnamed Group"}
                    >
                      {invite.groupName ?? "Unnamed Group"}
                    </h4>
                    <p className="text-sm text-gray-600 italic">
                      {invite.groupDescription ?? "No description provided."}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => acceptInvite(invite.gid)}
                      className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => declineInvite(invite.gid)}
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
