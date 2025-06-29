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
import { Button } from "./ui/button";
import { IoIosClose, IoMdCreate, IoMdRemove } from "react-icons/io";
import InviteNewMember from "./admin/InviteNewMember";
import RemoveAdmin from "./admin/RemoveAdmin";
import RemoveMember from "./admin/RemoveMember";

export default function IndividualGroupDrawer() {
  const {
    groupInfo: { isAdmin, groupAdmins, groupMembers },
  } = useGroup();
  return (
    <>
      <Sidebar side="left" variant="sidebar" className="mt-20 h-[87vh]">
        <SidebarHeader />
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
                      {isAdmin && (
                        <>
                          <RemoveAdmin adminToRemove={adminEmail}/>
                          <RemoveMember memberToDelete={adminEmail}/>
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
                          <Button
                            variant="outline"
                            className=" rounded-full w-5 h-6"
                          >
                            <IoMdCreate />
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full w-5 h-6 "
                          >
                            <IoIosClose />
                          </Button>
                        </>
                      )}
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {isAdmin && (
            <SidebarMenuButton className="max-w-fit rounded-2xl bg-red-50 mx-auto px-4">
              <IoMdRemove />
              Delete Group
            </SidebarMenuButton>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
