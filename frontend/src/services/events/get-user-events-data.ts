import axiosInstance from "@/lib/axios-instance";
import dayjs, { type Dayjs } from "dayjs";
import type { GetUserEventsDto } from "./get-user-events.dto";

export type GroupEvent = {
  eid: string;
  gid: string;
  groupName: string;
  groupDescription: string;
  rrule: null | string;
  eventName: string;
  startDatetime: Dayjs;
  endDatetime: Dayjs;
  highPriority: boolean;
};

export async function GetUserEvents(): Promise<GroupEvent[]> {
  const {
    data: { data },
  } = await axiosInstance.post<GetUserEventsDto>("/users/getUserEvents");

  return data
    .map<GroupEvent>(
      ({
        group: { groupName, groupDescription },
        eid,
        gid,
        rrule,
        eventName,
        endDatetime,
        highPriority,
        startDatetime,
      }) => ({
        eid,
        gid,
        groupName,
        groupDescription,
        rrule,
        eventName,
        startDatetime: dayjs(startDatetime),
        endDatetime: dayjs(endDatetime),
        highPriority,
      })
    )
    .sort((a, b) => (a.startDatetime.isBefore(b.startDatetime) ? -1 : 1));
}
