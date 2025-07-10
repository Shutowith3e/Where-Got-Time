// {
//     "data": [
//         {
//             "eid": "11c5101c-a31f-45c9-ae90-548ac3558888",
//             "gid": "c5a45461-b148-4d04-941a-c382669b93e2",
//             "event_name": "Testing event",
//             "start_datetime": "2025-06-23T18:24:03",
//             "end_datetime": "2025-06-30T18:24:10",
//             "high_priority": true,
//             "rrule": null
//         }
//     ]
// }

export type GroupEventData = {
  eid: string;
  gid: string;
  eventName: string;
  startDatetime: string;
  endDatetime: string;
  highPriority: boolean;
  rrule: null | string;
  duration: BigInt
};

export type GetGroupEventDto = {
  data: GroupEventData[];
};
