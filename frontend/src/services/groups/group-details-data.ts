import axiosInstance from "@/lib/axios-instance";
import type { GroupDetailsDto } from "./group-details.dto";

export type IndividualGroupDetail = {
  groupName: string;
  groupDescription: string;
};

// renamed to gid, backend takes in gid
export async function IndividualGroupDetail(gid : string): Promise<IndividualGroupDetail[]> {
  const {
    data: { data: groupDetails },
  } = await axiosInstance.post<GroupDetailsDto>("/groups/groupDetails",{gid});
  return groupDetails.map<IndividualGroupDetail>(
    ({ group_name, group_description }) => ({
      groupName: group_name,
      groupDescription: group_description,
    })
  );
}
