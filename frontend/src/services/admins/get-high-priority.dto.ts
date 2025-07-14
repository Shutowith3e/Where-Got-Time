import { RRule } from "rrule";

export type HighPriorityEvent = {
  eid: string;
  gid: string;
  rrule: null | RRule;
  duration: number;
  eventName: string;
  groupName: string;
  startDatetime: string;
  endDatetime: string;
  highPriority: boolean;
  eventParticipants: string[];
};

export type GetHighPriorityEventDto = {
  data: HighPriorityEvent[];
};
