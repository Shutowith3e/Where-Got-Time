import axiosInstance from "@/lib/axios-instance";
import type { Dayjs } from "dayjs";
import type { GetGroupEventDto } from "./get-group-events.dto";
import dayjs from "dayjs";

export type IndividualGroupEvent = {
  eid: string;
  gid: string;
  eventName: string;
  startDatetime: Dayjs;
  endDatetime: Dayjs;
  highPriority: boolean;
  rrule: null | string;
};

export async function getIndividualGroupEvent(
  gid: string
): Promise<IndividualGroupEvent[]> {
  const {
    data: { data },
  } = await axiosInstance.post<GetGroupEventDto>("/groups/groupEvents", {
    gid: gid,
  });
  return data
    .map<IndividualGroupEvent>(({ startDatetime, endDatetime, ...rest }) => ({
      startDatetime: dayjs(startDatetime),
      endDatetime: dayjs(endDatetime),
      ...rest,
    }))
    .sort((a, b) => (a.startDatetime.isBefore(b.startDatetime) ? -1 : 1));
}
