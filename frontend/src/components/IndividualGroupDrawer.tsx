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
  SidebarMenuItem,
} from "./ui/sidebar/sidebar";
import InviteNewMember from "./admin/InviteNewMember";
import RemoveAdmin from "./admin/RemoveAdmin";
import RemoveMember from "./admin/RemoveMember";
import MakeAdmin from "./admin/MakeAdmin";
import DeleteGroup from "./admin/DeleteGroup";
import useAuth from "@/context/AuthContext";
import LeaveGroup from "./group/LeaveGroup";

export default function IndividualGroupDrawer() {
  const {
    groupInfo: { isAdmin, groupAdmins, groupMembers },
  } = useGroup();
  const { userEmail } = useAuth();
  return (
    <Sidebar side="left" variant="sidebar">
      <SidebarHeader className="pt-20" />
      <SidebarContent>
        {isAdmin && (
          <SidebarGroup>
            <InviteNewMember />
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Group Admins </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupAdmins.map((adminEmail) => (
                <SidebarMenuItem key={adminEmail}>
                  <div className="w-[235px] flex flex-row gap-1">
                    <span className="block whitespace-nowrap overflow-hidden text-ellipsis w-full">
                      {adminEmail}
                    </span>
                    {isAdmin && adminEmail !== userEmail && (
                      <>
                        <RemoveAdmin adminToRemove={adminEmail} />
                        <RemoveMember memberToDelete={adminEmail} />
                      </>
                    )}
                  </div>
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
                  <div className="w-[235px] flex flex-row gap-1">
                    <span className="block whitespace-nowrap overflow-hidden text-ellipsis w-full">
                      {memberEmail}
                    </span>
                    {isAdmin && (
                      <>
                        <MakeAdmin makeMemberAdmin={memberEmail} />
                        <RemoveMember memberToDelete={memberEmail} />
                      </>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-10">
        <>
          <LeaveGroup />
          {isAdmin && <DeleteGroup />}
        </>
      </SidebarFooter>
    </Sidebar>
  );
}
