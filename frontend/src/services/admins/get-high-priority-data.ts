import axiosInstance from "@/lib/axios-instance";
import type {
  GetHighPriorityEventDto,
  HighPriorityEvent,
} from "./get-high-priority.dto";

export async function GetHighPriorityEvents(
  gid: string
): Promise<HighPriorityEvent[]> {
  const {
    data: { data },
  } = await axiosInstance.post<GetHighPriorityEventDto>(
    "admins/getHighPriorityEvents",
    { gid }
  );
  return data.map<HighPriorityEvent>(
    ({
      eid,
      gid,
      rrule,
      duration,
      eventName,
      groupName,
      startDatetime,
      endDatetime,
      highPriority,
      eventParticipants,
    }) => ({
      eid,
      gid,
      rrule,
      duration,
      eventName,
      groupName,
      startDatetime,
      endDatetime,
      highPriority,
      eventParticipants,
    })
  );
}
