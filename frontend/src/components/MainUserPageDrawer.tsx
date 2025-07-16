import GetUserClashesCard from "./GetUserClashesCard";
import GetPendingGroupsCard from "./group/GetPendingGroups";
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

        <h1 className="text-2xl font-bold text-center">Notifications</h1>

        <GetUserClashesCard />

        <GetPendingGroupsCard />
        
      </SidebarContent>
    </Sidebar>
  );
}