import axiosInstance from "@/lib/axios-instance";
import { type GetGroupsDto } from "./get-user-groups.dto";

export type GroupItem = {
  gid: string;
  groupDescription: string;
  groupName: string;
  isAdmin: boolean;
};

export async function getAllUserGroupsData(): Promise<GroupItem[]> {
  const {
    data: { data },
  } = await axiosInstance.post<GetGroupsDto>("/users/getGroups");

  return [
    ...data.adminArr.map<GroupItem>((group) => ({
      ...group,
      isAdmin: true,
    })),
    ...data.memberArr.map<GroupItem>((group) => ({
      ...group,
      isAdmin: false,
    })),
  ];
}
