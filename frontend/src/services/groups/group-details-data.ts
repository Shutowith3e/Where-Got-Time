import axiosInstance from "@/lib/axios-instance";
import type { GroupDetailsDto } from "./group-details.dto";

export type IndividualGroupDetail = {
  groupName: string;
  groupDescription: string;
};

export async function IndividualGroupDetail(): Promise<
  IndividualGroupDetail[]
> {
  const { data:{data:GroupDetails} } = await axiosInstance.post<GroupDetailsDto>(
    "/groups/groupDetails"
  );
  return GroupDetails.map<IndividualGroupDetail>(
    ({ group_name, group_description }) => ({
      groupName: group_name,
      groupDescription: group_description,
    })
  );
}
