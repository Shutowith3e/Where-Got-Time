// {
//     "data": [
//         {
//             "eid": "11c5101c-a31f-45c9-ae90-548ac3558888",
//             "gid": "c5a45461-b148-4d04-941a-c382669b93e2",
//             "group": {
//                 "group_name": "asdasda",
//                 "group_description": "this is a description"
//             },
//             "rrule": null,
//             "event_name": "Testing event",
//             "end_datetime": "2025-06-30T18:24:10",
//             "high_priority": true,
//             "start_datetime": "2025-06-23T18:24:03"
//         }
//     ]
// }

import type { GroupData } from "../groups/get-user-groups.dto";

type EventData = {
  eid: string;
  gid: string;
  group: GroupData;
  rrule: null | string;
  eventName: string;
  startDatetime: string;
  endDatetime: string;
  highPriority: boolean;
};

export type GetUserEventsDto = {
  data: EventData[];
};
