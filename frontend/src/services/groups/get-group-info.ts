import axiosInstance from "@/lib/axios-instance";
import {
  getIndividualGroupEvent,
  type IndividualGroupEvent,
} from "../events/get-group-events-data";

export type GroupInfoType = {
  gid: string;
  groupName: string;
  groupDescription: string;
  events: IndividualGroupEvent[];
  isAdmin: boolean;
  groupMembers: string[];
  groupAdmins: string[];
};

async function getGroupDetails(gid: string) {
  const {
    data: { data },
  } = await axiosInstance.post<{
    data: {
      groupName: string;
      groupDescription: string;
    };
  }>("/groups/groupDetails", { gid });
  return data;
}

async function getIsAdmin(gid: string) {
  const {
    data: { isAdmin },
  } = await axiosInstance.post<{ isAdmin: boolean }>("/groups/checkAdmin", {
    gid,
  });
  return isAdmin;
}

async function getGroupAdmins(gid: string) {
  const {
    data: { data: groupAdmins },
  } = await axiosInstance.post<{ data: string[] }>("/groups/groupAdmins", {
    gid,
  });
  return groupAdmins;
}

async function getGroupMembersAndAdmins(gid: string) {
  const {
    data: { data: groupMembersAndAdmins },
  } = await axiosInstance.post<{ data: string[] }>("/groups/groupMembers", {
    gid,
  });

  return groupMembersAndAdmins;
}

export async function getGroupInfo(gid: string): Promise<GroupInfoType> {
  const [
    { groupDescription, groupName },
    isAdmin,
    groupAdmins,
    groupMembersAndAdmins,
    events,
  ] = await Promise.all([
    getGroupDetails(gid),
    getIsAdmin(gid),
    getGroupAdmins(gid),
    getGroupMembersAndAdmins(gid),
    getIndividualGroupEvent(gid),
  ]);

  return {
    gid,
    groupName,
    groupDescription,
    isAdmin,
    events,
    groupAdmins,
    groupMembers: groupMembersAndAdmins.filter((x) => !groupAdmins.includes(x)),
  };
}
