import useGroup from "@/context/GroupContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar/sidebar";

export default function IndividualGroupDrawer() {
  const {
    groupInfo: { isAdmin, groupAdmins, groupMembers },
  } = useGroup();
  return (
    <>
      <Sidebar side="left" variant="sidebar" className="mt-20">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Group Admins </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupAdmins.map((adminEmail) => (
                  <SidebarMenuItem key={adminEmail}>
                    <SidebarMenuButton>{adminEmail}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Group Members </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupMembers.map((memberEmail) => (
                  <SidebarMenuItem key={memberEmail}>
                    <SidebarMenuButton>{memberEmail}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}
