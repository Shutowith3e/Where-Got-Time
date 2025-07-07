import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "./ui/sidebar/sidebar";

export default function MainUserDrawer() {
  return (
    <Sidebar side="left" variant="sidebar" className="mt-15 h-auto">
      <SidebarHeader />
      <SidebarContent className="p-4 flex flex-col gap-4">

        {/* Box 1: Notifications */}
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
          <h3 className="text-md font-semibold">Group Invites</h3>
          <p className="mt-2 text-sm text-gray-600">
            You have 2 pending group invites.
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
            <li>Group Alpha</li>
            <li>Group Beta</li>
          </ul>
        </div>
      </SidebarContent>

    </Sidebar>
  );
}
