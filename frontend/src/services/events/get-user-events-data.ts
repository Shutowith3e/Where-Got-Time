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
        group: { group_name, group_description },
        eid,
        gid,
        rrule,
        event_name,
        end_datetime,
        high_priority,
        start_datetime,
      }) => ({
        eid: eid,
        gid: gid,
        groupName: group_name,
        groupDescription: group_description,
        rrule: rrule,
        eventName: event_name,
        startDatetime: dayjs(start_datetime),
        endDatetime: dayjs(end_datetime),
        highPriority: high_priority,
      })
    )
    .filter(({ startDatetime }) =>
      startDatetime.isBetween(dayjs(), dayjs().add(2, "weeks"))
    )
    .sort((a, b) => (a.startDatetime.isBefore(b.startDatetime) ? -1 : 1));
}
