import axiosInstance from "@/lib/axios-instance";
import { type GetGroupsDto } from "./get-groups.dto";

export type GroupItem = {
  gid: string;
  groupDescription: string;
  groupName: string;
  isAdmin: boolean;
};

export async function getGroupData(): Promise<GroupItem[]> {
  const {
    data: { data },
  } = await axiosInstance.post<GetGroupsDto>("/users/getGroups");

  return [
    ...data.admin_arr.map<GroupItem>(
      ({ gid, group_description, group_name }) => ({
        gid: gid,
        groupDescription: group_description,
        groupName: group_name,
        isAdmin: true,
      })
    ),
    ...data.member_arr.map<GroupItem>(
      ({ gid, group_description, group_name }) => ({
        gid: gid,
        groupDescription: group_description,
        groupName: group_name,
        isAdmin: false,
      })
    ),
  ];
}
